const keyframes = `
    @keyframes fadeInTop {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }
        33% {
            transform: translateY(10px);
        }
        75% {
            transform: translateY(-5px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes fadeInLeft {
        0% {
            opacity: 0;
            transform: translateX(-7px);
        }
        50% {
            transform: translateX(3px);
        }
        75% {
            transform: translateX(-3px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes fadeInRight {
        0% {
            opacity: 0;
            transform: translateX(7px);
        }
        50% {
            transform: translateX(-3px);
        }
        75% {
            transform: translateX(3px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes fadeInBottom {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        50% {
            transform: translateY(-10px);
        }
        75% {
            transform: translateY(5px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes fadeInTooltip {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`

const tooltip = `
    .detailed-tooltip {
        display: none;
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 37px;
        width: 250px;
        padding: 10px;
        border-radius: 4px;
        background-color: #161616;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .5);
        z-index: 1000;
        opacity: 0;
        animation: fadeInTooltip 0.2s ease-in-out forwards;
    }
    .detailed-stats-wrapper > div:hover {
        cursor: pointer;
    }
    .detailed-stats-wrapper > div:hover .detailed-tooltip {
        display: block;
    }
`

const media = `
    @media (max-width: 1400px) {
        .detailed-stats-container {
            font-size: 12px;
        }
        .stats-numbers {
            font-size: 14px;
        }
        .stats-block .stat {
            padding: 0 1.6rem;
        }
    }
    @media (max-width: 1200px) {
        .detailed-stats-container {
            grid-template-areas: 
                "first first first first"
                "second second second second"
                "third third third third"
                "fourth fourth fourth fourth"
                "fifth fifth fifth fifth"
                "sixth sixth sixth sixth"
                "seventh seventh seventh seventh"
        }
    }
    @media (max-width: 540px) {
        .detailed-tooltip {
            transform: translateX(-50%) !important;
            bottom: calc(100% + 5px);
            left: 0;
            top: unset;
        }
    }
    @media (max-width: 475px) {
        .detailed-stats-container {
            font-size: 10px;
        }
        .stats-numbers {
            font-size: 12px;
        }
        .stats-block .stat {
            padding: 0 1rem;
        }
    }
`

const styles = `
    .faceit-detailed-csgo-stats {
        margin-bottom: 2.5rem;
    }
    .faceit-detailed-csgo-stats > .loader {
        padding: 30px 24px;
        background: #161616;
        border-radius: 4px;
    }
    .detailed-stats-wrapper {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        gap: 20px;
    }
    .detailed-stats-container {
        display: grid; 
        grid-template-columns: repeat(4, 1fr); 
        grid-template-rows: repeat(3, 1fr); 
        gap: 10px 10px;
        background: linear-gradient(30deg, #0f0f0f 0%, #232828 100%); 
        grid-template-areas: 
            "first first second second"
            "third fourth fourth fifth"
            "sixth sixth seventh seventh";
        font-size: 14px;
    }
    .detailed-stats-container .stats-block {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px 15px;
        outline: 10px solid #1f1f1f;
        border-radius: 4px;
        opacity: 0;
    }
    .stats-numbers {
        font-size: 16px;
        font-weight: bold;
    }
    .stats-numbers-weekly-green {
        color: #32d35a;
    }
    .stats-numbers-weekly-red {
        color: #ff002b;
    }
    .stats-block .stat {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 0 2rem;
        text-align: center;
    }
    .stats-block .stat:after {
        content: "";
        position: absolute;
        top: -10%;
        right: 0;
        display: block;
        width: 1px;
        height: 120%;
        background: #232828;
        
    }
    .stats-block .stat:last-child:after {
        display: none;
    }
    .stats-block.first { 
        grid-area: first; 
        animation: fadeInRight 0.6s cubic-bezier(.2, .2, .3, 1) 0.25s forwards;
    }
    .stats-block.second { 
        grid-area: second;
        animation: fadeInLeft 0.6s cubic-bezier(.2, .2, .3, 1) 0.25s forwards; 
    }
    .stats-block.third { 
        grid-area: third;
        animation: fadeInLeft 0.6s cubic-bezier(.2, .2, .3, 1) 0.35s forwards; 
    }
    .stats-block.fourth { 
        grid-area: fourth; 
        animation: fadeIn 1.2s cubic-bezier(.2, .2, .3, 1) 0.45s forwards; 
    }
    .stats-block.fifth { 
        grid-area: fifth; 
        animation: fadeInRight 0.6s cubic-bezier(.2, .2, .3, 1) 0.35s forwards; 
    }
    .stats-block.sixth { 
        grid-area: sixth; 
        animation: fadeInRight 0.6s cubic-bezier(.2, .2, .3, 1) 0.55s forwards;
        flex-direction: column;
    }
    .stats-block.seventh { 
        grid-area: seventh; 
        animation: fadeInLeft 0.6s cubic-bezier(.2, .2, .3, 1) 0.55s forwards;
    }
    ${tooltip}
    ${keyframes}
    ${media}
`

module.exports = {
    styles
}