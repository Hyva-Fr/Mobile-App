import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from "../../utils/CSS";

function Close(props) {

    const active = props.active !== 'Close' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M17.016 15.609L13.407 12l3.609-3.609-1.406-1.406-3.609 3.609-3.609-3.609-1.406 1.406L10.595 12l-3.609 3.609 1.406 1.406 3.609-3.609 3.609 3.609zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055T12 21.986t-7.055-2.93-2.93-7.055 2.93-7.055T12 2.016z" />
        </Svg>
    )
}

export default Close
