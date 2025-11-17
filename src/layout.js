const availableMaps = ["Inferno", "Train", "Dust2", "Vertigo", "Ancient", "Overpass", "Mirage", "Nuke"];
const tooltip = `
    <div class="detailed-tooltip">
        <div class="detailed-tooltip-content">
            <span class="stats-numbers-weekly-green">(+N)</span> and <span class="stats-numbers-weekly-red">(+N)</span> display current stats progress in last 7 matches
            <br><br>
            Maps from where stats is taken:
            <br>
            - ${availableMaps.map(map => `${map}`).join('<br>- ')}
        </div>
    </div>
`

const supportIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M9.33 11.5h2.17A4.5 4.5 0 0 1 16 16H8.999L9 17h8v-1a5.578 5.578 0 0 0-.886-3H19a5 5 0 0 1 4.516 2.851C21.151 18.972 17.322 21 13 21c-2.761 0-5.1-.59-7-1.625L6 10.071A6.967 6.967 0 0 1 9.33 11.5zM4 9a1 1 0 0 1 .993.883L5 10V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h2zm9.646-5.425L14 3.93l.354-.354a2.5 2.5 0 1 1 3.535 3.536L14 11l-3.89-3.89a2.5 2.5 0 1 1 3.536-3.535z" fill="rgba(255,255,255,1)"/></svg>'

const infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" fill="rgba(255,255,255,1)"></path></svg>'

const spinner = '<svg class="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z" fill="rgba(255,255,255,1)"></path></svg>'

const preparedDiv = `
    <h1 style="text-transform: none;">Detailed Stats</h1>
    <div class="loader">${spinner}Loading...</div>
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
        avgKills,
        avgDeaths,
        lastWins,
        lastWinsPercent,    
        lastLosses,
        lastLossesPercent,
        lastMatchesStats
    }) => {
    return `
        <div class="detailed-stats-wrapper">
            <div style="position: relative;">
                <div class="detailed-tooltip top content-width">
                    <div class="detailed-tooltip-content">Support author</div>
                </div>
                <a class="support-link" href="https://www.donationalerts.com/r/ppitohu" target="_blank">${supportIcon}</a>
            </div>
            <h1>Detailed Stats</h1>
            <div style="position: relative; display: flex;">
                ${infoIcon}
                ${tooltip}
            </div>
        </div>
        <div class="detailed-stats-container">
            <div class="stats-block first">
                <div class="stat">
                    <span>TOTAL KILLS</span>
                    <span class="stats-numbers">
                        ${totalKills}
                        <span class="stats-numbers-weekly-green">(+${lastMatchesStats.kills})</span>
                    </span>
                </div>
                <div class="stat">
                    <span>TOTAL DEATHS</span>
                    <span class="stats-numbers">
                        ${totalDeaths}
                        <span class="stats-numbers-weekly-red">(+${lastMatchesStats.deaths})</span>
                    </span>
                </div>
                <div class="stat">
                    <span>TOTAL HEADSHOTS</span>
                    <span class="stats-numbers">
                        ${totalHeadshots}
                        <span class="stats-numbers-weekly-green">(+${lastMatchesStats.headshots})</span>
                    </span>
                </div>
                <div class="stat">
                    <span>TOTAL ASSISTS</span>
                    <span class="stats-numbers">
                        ${totalAssists}
                        <span class="stats-numbers-weekly-green">(+${lastMatchesStats.assists})</span>
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
                        <span>(+${lastMatchesStats.wins})</span>
                    </span>
                </div>
                <div class="stat">
                    <span>TOTAL LOSSES</span>
                    <span class="stats-numbers stats-numbers-weekly-red">
                        ${totalLosses}
                        <span>(+${lastMatchesStats.losses})</span>
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
                        <span class="stats-numbers-weekly-green">(+${lastMatchesStats.triple})</span>
                    </span>
                </div>
                <div class="stat">
                    <span>QUADRO KILLS</span>
                    <span class="stats-numbers">
                        ${totalQuadro}
                        <span class="stats-numbers-weekly-green">(+${lastMatchesStats.quadro})</span>
                    </span>
                </div>
                <div class="stat">
                    <span>PENTA KILLS</span>
                    <span class="stats-numbers">
                        ${totalPenta}
                        <span class="stats-numbers-weekly-green">(+${lastMatchesStats.penta})</span>
                    </span>
                </div>
                <br>
                <div class="stat">
                    <span>MVPs</span>
                    <span class="stats-numbers">
                        ${totalMVPs}
                        <span class="stats-numbers-weekly-green">(+${lastMatchesStats.MVPs})</span>
                    </span>
                </div>
            </div>
            <div class="stats-block fifth">
                <div class="stat">
                    <span>AVG KILLS</span>
                    <span class="stats-numbers">${avgKills}</span>
                </div>
                <div class="stat">
                    <span>AVG DEATHS</span>
                    <span class="stats-numbers">${avgDeaths}</span>
                </div>
            </div>
            <div class="stats-block sixth">
                <h3 style="line-height: 1;">LAST 20 MATCHES (includes championships)</h3>
                <div style="display: flex;margin-bottom: 10px;">
                    <div class="stat">
                        <span>WINS</span>
                        <span class="stats-numbers stats-numbers-weekly-green">
                            ${lastWins}
                            <span>(${lastWinsPercent}%)</span>
                        </span>
                    </div>
                    <div class="stat">
                        <span>LOSSES</span>
                        <span class="stats-numbers stats-numbers-weekly-red">
                            ${lastLosses}
                            <span>(${lastLossesPercent}%)</span>
                        </span>
                    </div>
                    <div class="stat">
                        <span>AVG KILLS</span>
                        <span class="stats-numbers ${lastMatchesStats.avgKills > 20 ? 'stats-numbers-weekly-green' : ''}">
                            ${lastMatchesStats.avgKills}
                        </span>
                    </div>
                    <div class="stat">
                        <span>AVG DEATHS</span>
                        <span class="stats-numbers ${lastMatchesStats.avgDeaths > 23 ? 'stats-numbers-weekly-red' : ''}">
                            ${lastMatchesStats.avgDeaths}
                        </span>
                    </div>
                </div>
            </div>
            <div class="stats-block seventh">
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
        </div>
    `
}

module.exports = {
    preparedDiv,
    updateDiv,
    availableMaps
}