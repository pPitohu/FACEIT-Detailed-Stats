const availableMaps = ["de_inferno", "de_train", "de_dust2", "de_vertigo", "de_ancient", "de_overpass", "de_mirage", "de_nuke"];
const tooltip = `
    <div class="detailed-tooltip">
        <div class="detailed-tooltip-content">
            <span class="stats-numbers-weekly-green">(+N)</span> and <span class="stats-numbers-weekly-red">(+N)</span> display current stats progress in last 5 matches
            <br><br>
            Maps from where stats is taken:
            <br>
            - ${availableMaps.map(map => `${map}`).join('<br>- ')}
        </div>
    </div>
`
const preparedDiv = `
    <h1>Detailed Stats</h1>
    <div class="loader">Loading...</div>
`

const updateDiv = ({
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
        lastLosses,
        lastFiveMatchesStats
    }) => {
    return `
        <div class="detailed-stats-wrapper">
            <h1>Detailed Stats</h1>
            <div style="position: relative;">
                <i class="sc-dIUggk bGCMgf"><svg class="sc-idOhPF sc-dmlrTW guKkvw" height="32" width="32" role="img" viewBox="0 0 24 24"><use xlink:href="#f_icon_f3343600"></use></svg></i>
                ${tooltip}
            </div>
        </div>
        <div class="detailed-stats-container">
            <div class="stats-block first">
                <div class="stat">
                    <span>TOTAL KILLS</span>
                    <span class="stats-numbers">
                        ${totalKills}
                        <span class="stats-numbers-weekly-green">(+${lastFiveMatchesStats.kills})</span>
                    </span>
                </div>
                <div class="stat">
                    <span>TOTAL DEATHS</span>
                    <span class="stats-numbers">
                        ${totalDeaths}
                        <span class="stats-numbers-weekly-red">(+${lastFiveMatchesStats.deaths})</span>
                    </span>
                </div>
                <div class="stat">
                    <span>TOTAL HEADSHOTS</span>
                    <span class="stats-numbers">
                        ${totalHeadshots}
                        <span class="stats-numbers-weekly-green">(+${lastFiveMatchesStats.headshots})</span>
                    </span>
                </div>
                <div class="stat">
                    <span>TOTAL ASSISTS</span>
                    <span class="stats-numbers">
                        ${totalAssists}
                        <span class="stats-numbers-weekly-green">(+${lastFiveMatchesStats.assists})</span>
                    </span>
                </div>
            </div>
            <div class="stats-block second">
                <div class="stat">
                    <span>TOTAL MATCHES</span>
                    <span class="stats-numbers">
                        ${totalMatches}
                    </span>
                </div>
                <div class="stat">
                    <span>TOTAL WINS</span>
                    <span class="stats-numbers stats-numbers-weekly-green">
                        ${totalWins}
                    </span>
                </div>
                <div class="stat">
                    <span>TOTAL LOSSES</span>
                    <span class="stats-numbers stats-numbers-weekly-red">
                        ${totalLosses}
                    </span>
                </div>
                <div class="stat">
                    <span>TOTAL WINRATE</span>
                    <span class="stats-numbers stats-numbers-weekly-${parseFloat(totalWinRate) < 50 ? 'red' : 'green'}">
                        ${totalWinRate}%
                    </span>
                </div>
            </div>
            <div class="stats-block third">
                <div class="stat">
                    <span>TOTAL K/D</span>
                    <span class="stats-numbers stats-numbers-weekly-${parseFloat(totalKD) < 1 ? 'red' : 'green'}">
                        ${totalKD}
                    </span>
                </div>
                <div class="stat">
                    <span>TOTAL K/D/A</span>
                    <span class="stats-numbers stats-numbers-weekly-${parseFloat(totalKDA) < 1 ? 'red' : 'green'}">
                        ${totalKDA}
                    </span>
                </div>
            </div>
            <div class="stats-block fourth">
                <div class="stat">
                    <span>TRIPLE KILLS</span>
                    <span class="stats-numbers">
                        ${totalTriple}
                        <span class="stats-numbers-weekly-green">(+${lastFiveMatchesStats.triple})</span>
                    </span>
                </div>
                <div class="stat">
                    <span>QUADRO KILLS</span>
                    <span class="stats-numbers">
                        ${totalQuadro}
                        <span class="stats-numbers-weekly-green">(+${lastFiveMatchesStats.quadro})</span>
                    </span>
                </div>
                <div class="stat">
                    <span>PENTA KILLS</span>
                    <span class="stats-numbers">
                        ${totalPenta}
                        <span class="stats-numbers-weekly-green">(+${lastFiveMatchesStats.penta})</span>
                    </span>
                </div>
                <br>
                <div class="stat">
                    <span>MVPs</span>
                    <span class="stats-numbers">
                        ${totalMVPs}
                        <span class="stats-numbers-weekly-green">(+${lastFiveMatchesStats.MVPs})</span>
                    </span>
                </div>
            </div>
            <div class="stats-block fifth">
                <div class="stat">
                    <span>ROUNDS PLAYED</span>
                    <span class="stats-numbers">
                        ${totalRounds}
                    </span>
                </div>
                <div class="stat">
                    <span>HEADSHOT PER ROUND</span>
                    <span class="stats-numbers">
                        ${totalHSR}
                    </span>
                </div>
            </div>
            <div class="stats-block sixth">
                <h3 style="line-height: 1;">LAST 20 MATCHES</h3>
                <div style="display: flex;margin-bottom: 10px;">
                    <div class="stat">
                        <span>WINS</span>
                        <span class="stats-numbers stats-numbers-weekly-green">
                            ${lastWins}
                        </span>
                    </div>
                    <div class="stat">
                        <span>LOSSES</span>
                        <span class="stats-numbers stats-numbers-weekly-red">
                            ${lastLosses}
                        </span>
                    </div>
                </div>
            </div>
            <div class="stats-block seventh">Soon...</div>
        </div>
    `
}

module.exports = {
    preparedDiv,
    updateDiv,
    availableMaps
}