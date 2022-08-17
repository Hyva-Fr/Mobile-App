import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Email(props) {

    const active = props.active !== 'Email' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M10.781 14.274L10 22l4.77-5.893 4.564 2.06L24 2 10.781 14.274zM24 2L0 11.865 5.666 13 10 22l-3.125-9L24 2z" />
        </Svg>
    )
}

export default Email
