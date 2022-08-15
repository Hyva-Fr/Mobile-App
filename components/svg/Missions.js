import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Missions(props) {

    const active = props.active !== 'Missions' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M12.984 3H21v6h-8.016V3zm0 18v-9.984H21V21h-8.016zM3 21v-6h8.016v6H3zm0-8.016V3h8.016v9.984H3z" />
        </Svg>
    )
}

export default Missions
