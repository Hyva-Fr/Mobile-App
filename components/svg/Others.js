import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Others(props) {

    const active = props.active !== 'Others' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M21 18V9.984h-3.984V18H21zm.984-9.984q.375 0 .703.305t.328.68v9.984q0 .375-.328.703t-.703.328h-6q-.375 0-.68-.328t-.305-.703V9.001q0-.375.305-.68t.68-.305h6zm-10.968 9.468q.609 0 1.055-.445t.445-1.055-.445-1.055-1.055-.445-1.055.445-.445 1.055.445 1.055 1.055.445zM12.984 12v1.781q1.031.938 1.031 2.203 0 1.313-1.031 2.25v1.781H9v-1.781q-.984-.891-.984-2.25 0-1.313.984-2.203V12h3.984zM3 6v12h3.984v2.016H3q-.797 0-1.406-.609t-.609-1.406v-12q0-.797.609-1.406T3 3.986h18v2.016H3z" />
        </Svg>
    )
}

export default Others
