import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Arrow(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={Css().root.darkGrey} d="M18 11h-7.244l1.586-1.586a2 2 0 10-2.828-2.828L3.1 13l6.414 6.414c.39.391.902.586 1.414.586s1.023-.195 1.414-.586a2 2 0 000-2.828L10.756 15H18a2 2 0 000-4z" />
        </Svg>
    )
}

export default Arrow
