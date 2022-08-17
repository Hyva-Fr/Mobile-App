import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Device(props) {

    const active = props.active !== 'Device' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M21 14.016V3.985H3v10.031h18zm0-12q.797 0 1.406.586t.609 1.383v12q0 .797-.609 1.406T21 18h-6.984l1.969 3v.984H8.016V21l1.969-3H3.001q-.797 0-1.406-.609t-.609-1.406v-12q0-.797.609-1.383t1.406-.586h18z" />
        </Svg>
    )
}

export default Device
