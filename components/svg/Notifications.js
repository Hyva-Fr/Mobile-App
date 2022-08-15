import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Notifications(props) {

    const headerIcon = props.headerIcon !== 'Notifications' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : headerIcon

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M18 15.984L20.016 18v.984H3.985V18l2.016-2.016v-4.969q0-2.344 1.195-4.078t3.305-2.25v-.703q0-.609.422-1.055t1.078-.445 1.078.445.422 1.055v.703q2.109.516 3.305 2.25t1.195 4.078v4.969zm-6 6q-.844 0-1.43-.563t-.586-1.406h4.031q0 .797-.609 1.383T12 21.984z" />
        </Svg>
    )
}

export default Notifications
