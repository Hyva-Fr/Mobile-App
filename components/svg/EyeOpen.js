import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function EyeOpen(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={Css().root.darkGrey} d="M12 9q1.219 0 2.109.891T15 12t-.891 2.109T12 15t-2.109-.891T9 12t.891-2.109T12 9zm0 8.016q2.063 0 3.539-1.477T17.016 12t-1.477-3.539T12 6.984 8.461 8.461 6.984 12t1.477 3.539T12 17.016zM12 4.5q3.703 0 6.703 2.063t4.313 5.438q-1.313 3.375-4.313 5.438T12 19.502t-6.703-2.063-4.313-5.438q1.313-3.375 4.313-5.438T12 4.5z" />
        </Svg>
    )
}

export default EyeOpen