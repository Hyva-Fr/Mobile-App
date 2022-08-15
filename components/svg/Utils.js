import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Utils(props) {

    const active = props.active !== 'Utils' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M12 15.984q.797 0 1.406.609t.609 1.406-.609 1.406-1.406.609-1.406-.609-.609-1.406.609-1.406T12 15.984zm0-6q.797 0 1.406.609t.609 1.406-.609 1.406-1.406.609-1.406-.609-.609-1.406.609-1.406T12 9.984zm0-1.968q-.797 0-1.406-.609t-.609-1.406.609-1.406T12 3.986t1.406.609.609 1.406-.609 1.406T12 8.016z" />
        </Svg>
    )
}

export default Utils
