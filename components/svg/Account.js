import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Account(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill='#000' d="M12 19.219q1.594 0 3.352-.938T18 15.984q-.047-1.313-2.109-2.203T12 12.89t-3.891.867T6 15.984q.891 1.359 2.648 2.297t3.352.938zm0-14.203q-1.219 0-2.109.891T9 8.016t.891 2.109 2.109.891 2.109-.891T15 8.016t-.891-2.109T12 5.016zm0-3q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055T12 21.986t-7.055-2.93-2.93-7.055 2.93-7.055T12 2.016z" />
        </Svg>
    )
}

export default Account
