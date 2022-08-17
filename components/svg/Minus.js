import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Minus(props) {

    const active = props.active !== 'Minus' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 20 20"
            {...props}
        >
            <Path fill={fill} d="M16 10c0 .553-.048 1-.601 1H4.601C4.049 11 4 10.553 4 10s.049-1 .601-1H15.4c.552 0 .6.447.6 1z" />
        </Svg>
    )
}

export default Minus
