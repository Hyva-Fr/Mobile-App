import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Lock(props) {

    const active = props.active !== 'Lock' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M15.094 8.016V6q0-1.266-.914-2.18T12 2.906t-2.18.914T8.906 6v2.016h6.188zm-3.094 9q.797 0 1.406-.609t.609-1.406-.609-1.406T12 12.986t-1.406.609-.609 1.406.609 1.406 1.406.609zm6-9q.797 0 1.406.586t.609 1.383v10.031q0 .797-.609 1.383T18 21.985H6q-.797 0-1.406-.586t-.609-1.383V9.985q0-.797.609-1.383T6 8.016h.984V6q0-2.063 1.477-3.539T12 .984t3.539 1.477T17.016 6v2.016H18z" />
        </Svg>
    )
}

export default Lock
