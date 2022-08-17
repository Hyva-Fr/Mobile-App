import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Mark(props) {

    const active = props.active !== 'Mark' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M17.016 18V5.016H6.985V18l5.016-2.203zm0-15q.797 0 1.383.609t.586 1.406v15.984l-6.984-3-6.984 3V5.015q0-.797.586-1.406T6.986 3h10.031z" />
        </Svg>
    )
}

export default Mark
