import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Copy(props) {

    const active = props.active !== 'Copy' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M18.984 21V6.984H8.015V21h10.969zm0-15.984q.797 0 1.406.586t.609 1.383v14.016q0 .797-.609 1.406t-1.406.609H8.015q-.797 0-1.406-.609T6 21.001V6.985q0-.797.609-1.383t1.406-.586h10.969zm-3-4.032V3h-12v14.016H2.015V3q0-.797.586-1.406T3.984.985h12z" />
        </Svg>
    )
}

export default Copy
