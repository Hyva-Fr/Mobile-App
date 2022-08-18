import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Check(props) {

    const active = props.active !== 'Check' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M9 16.172L19.594 5.578 21 6.984l-12 12-5.578-5.578L4.828 12z" />
        </Svg>
    )
}

export default Check
