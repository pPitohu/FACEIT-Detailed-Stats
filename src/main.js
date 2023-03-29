const axios = require('axios');
const { authHeader, getNickname } = require('./helpers');
const { styles } = require('./style');
const { availableMaps, preparedDiv, updateDiv } = require('./layout.js');
let prevUrl = window.location.href;
const log_styles = 'color: #EBEFF3; background: #141616; padding: 2px 5px; border-radius: 4px; margin: 5px; font-size: 16px;';

const loadStyles = () => {
    const style = document.createElement('style');
    style.textContent = styles;
    document.querySelector('parasite-player-profile-content').shadowRoot.appendChild(style);
}

const prepareLayout = () => {
    if (document.querySelector('parasite-player-profile-content').shadowRoot.querySelector('.faceit-detailed-csgo-stats')) return;
    loadStyles();
    const layout = document.querySelector('parasite-player-profile-content').shadowRoot;
    const div = document.createElement('div')
    div.className = 'faceit-detailed-csgo-stats'
    div.innerHTML = preparedDiv
    layout.prepend(div);
}
const updateLayout = (stats) => {
    const layout = document.querySelector('parasite-player-profile-content').shadowRoot;
    layout.querySelector('.faceit-detailed-csgo-stats').innerHTML = updateDiv(stats);
}

const getUser = async () => {
    const res = await axios.get(`${process.env.FACEIT_URL}/players?nickname=${getNickname()}`, authHeader)
    return res.data;
}

const getGameData = async (id) => {
    const res = await axios.get(`${process.env.FACEIT_URL}/players/${id}/stats/csgo`, authHeader)
    return res.data;
}

const getHistory = async (id) => {
    const res = await axios.get(`${process.env.FACEIT_URL}/players/${id}/history?game=csgo&offset=0&limit=20`, authHeader);
    return res.data.items;
}

const displayStats = async () => {
    try {
        prepareLayout();
        const currentUser = await getUser();
        const currentCSGOStatsData = getGameData(currentUser.player_id);
        const currentHistoryData = getHistory(currentUser.player_id);
        const [currentCSGOStats, currentHistory] = await Promise.all([currentCSGOStatsData, currentHistoryData]);
        const stats = await computeStats(currentCSGOStats, currentHistory);
        console.log('%c[FACEIT Detailed CSGO Stats]', log_styles, 'Current user', currentUser);
        console.log('%c[FACEIT Detailed CSGO Stats]', log_styles, 'currentCSGOStats', currentCSGOStats);
        console.log('%c[FACEIT Detailed CSGO Stats]', log_styles, 'currentHistory', currentHistory);
        console.log('%c[FACEIT Detailed CSGO Stats]', log_styles, 'computed stats', stats);
        updateLayout(stats);
    } catch (e) {
        console.log('%c[FACEIT Detailed CSGO Stats]', log_styles, 'Error: ' + e.message);
        console.log(e)
        // console.log('%c[FACEIT Detailed CSGO Stats]', log_styles, 'Retrying after 5s');
        // setTimeout(displayStats, 5000);
    }
}

const computeStats = async (current, history) => {
    const nickname = getNickname();
    const maps = current.segments.filter(segment => availableMaps.includes(segment.label));

    const totalKills = maps.reduce((acc, curr) => acc + parseInt(curr.stats['Kills']), 0);
    const totalDeaths = maps.reduce((acc, curr) => acc + parseInt(curr.stats['Deaths']), 0);
    const totalAssists = maps.reduce((acc, curr) => acc + parseInt(curr.stats['Assists']), 0);
    const totalHeadshots = maps.reduce((acc, curr) => acc + parseInt(curr.stats['Headshots']), 0);
    const totalMVPs = maps.reduce((acc, curr) => acc + parseInt(curr.stats['MVPs']), 0);
    const totalRounds = maps.reduce((acc, curr) => acc + parseInt(curr.stats['Rounds']), 0);
    const totalTriple = maps.reduce((acc, curr) => acc + parseInt(curr.stats['Triple Kills']), 0);
    const totalQuadro = maps.reduce((acc, curr) => acc + parseInt(curr.stats['Quadro Kills']), 0);
    const totalPenta = maps.reduce((acc, curr) => acc + parseInt(curr.stats['Penta Kills']), 0);
    const totalMatches = maps.reduce((acc, curr) => acc + parseInt(curr.stats['Matches']), 0);
    const totalWins = maps.reduce((acc, curr) => acc + parseInt(curr.stats['Wins']), 0);
    const avgKills = (maps.reduce((acc, curr) => acc + parseFloat(curr.stats['Average Kills']), 0) / maps.length).toFixed(2);
    const avgDeaths = (maps.reduce((acc, curr) => acc + parseFloat(curr.stats['Average Deaths']), 0) / maps.length).toFixed(2);
    const totalLosses = totalMatches - totalWins;
    const totalWinRate = ((totalWins / totalMatches) * 100).toFixed(2);
    const totalKD = (totalKills / totalDeaths).toFixed(2);
    const totalKDA = ((totalKills + totalAssists) / totalDeaths).toFixed(2);
    const totalHSR = (totalHeadshots / totalRounds).toFixed(2);

    const lastWins = history.filter(match => match.teams[match.results.winner]?.players.map(player => player.nickname).includes(nickname)).length;
    const lastWinsPercent = parseFloat((lastWins * 100 / history.length).toFixed(2));
    const lastLosses = history.filter(match => !match.teams[match.results.winner]?.players.map(player => player.nickname).includes(nickname)).length;
    const lastLossesPercent = parseFloat((lastLosses * 100 / history.length).toFixed(2));

    const lastMatchesStats = await getLastMatchesStats(history.slice(0, 7), nickname);

    return {
        totalKills,
        totalDeaths,
        totalAssists,
        totalHeadshots,
        totalMVPs,
        totalRounds,
        totalTriple,
        totalQuadro,
        totalPenta,
        totalMatches,
        totalWins,
        totalLosses,
        totalWinRate,
        totalKD,
        totalKDA,
        totalHSR,
        lastWins,
        lastWinsPercent,
        lastLosses,
        lastLossesPercent,
        lastMatchesStats,
        avgKills,
        avgDeaths
    }
}

const getLastMatchesStats = async (matchesData, nickname) => {
    let res = await Promise.allSettled(matchesData.map(match => axios.get(`${process.env.FACEIT_URL}/matches/${match.match_id}/stats`, authHeader)));
    res = res.filter(r => r.status === 'fulfilled').map(r => r.value)
    const matches = res.map(match => match.data.rounds[0]);
    console.log('%c[FACEIT Detailed CSGO Stats]', log_styles, matches)

    const matchTeams = matches.map(match => match.teams);
    const playerMatches = matchTeams.map(matchTeam => matchTeam.find(team => team?.players.map(player => player.nickname).includes(nickname)));
    const playerWinnerTeamIds = playerMatches.map(m => m.team_id);
    const wonMatches = matches.filter((match, index) => match.round_stats["Winner"] === playerWinnerTeamIds[index]);
    const playerStatsEachMatch = playerMatches.map(match => match.players.find(player => player.nickname === nickname).player_stats);

    console.log('%c[FACEIT Detailed CSGO Stats]', log_styles, playerStatsEachMatch, wonMatches);
    const kills = playerStatsEachMatch.reduce((acc, stats) => acc + parseInt(stats?.['Kills'] || 0), 0);
    const deaths = playerStatsEachMatch.reduce((acc, stats) => acc + parseInt(stats?.['Deaths'] || 0), 0);
    const headshots = playerStatsEachMatch.reduce((acc, stats) => acc + parseInt(stats?.['Headshots'] || 0), 0);
    const assists = playerStatsEachMatch.reduce((acc, stats) => acc + parseInt(stats?.['Assists'] || 0), 0);
    const triple = playerStatsEachMatch.reduce((acc, stats) => acc + parseInt(stats?.['Triple Kills'] || 0), 0);
    const quadro = playerStatsEachMatch.reduce((acc, stats) => acc + parseInt(stats?.['Quadro Kills'] || 0), 0);
    const penta = playerStatsEachMatch.reduce((acc, stats) => acc + parseInt(stats?.['Penta Kills'] || 0), 0);
    const MVPs = playerStatsEachMatch.reduce((acc, stats) => acc + parseInt(stats?.['MVPs'] || 0), 0);
    const avgKills = (kills / playerMatches.length).toFixed(2);
    const avgDeaths = (deaths / playerMatches.length).toFixed(2);

    const wins = wonMatches.length;
    const losses = playerMatches.length - wonMatches.length;
    
    return {
        kills,
        deaths,
        headshots,
        assists,
        triple,
        quadro,
        penta,
        MVPs,
        wins,
        losses,
        avgKills,
        avgDeaths
    }
}

// url watcher
if (prevUrl.includes('/stats/csgo')) setTimeout(() => displayStats(), 500);;
setInterval(() => {
    if (prevUrl !== window.location.href) {
        prevUrl = window.location.href;
        console.log('%c[FACEIT Detailed CSGO Stats]', log_styles, 'url changed');
        if (prevUrl.includes('/stats/csgo')) {
            console.log('%c[FACEIT Detailed CSGO Stats]', log_styles, 'url contains /stats/csgo');
            displayStats();
        }
    }
}, 500);