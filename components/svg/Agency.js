import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Agency(props) {

    const active = props.active !== 'Agency' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M12 18v-3.984H6V18h6zm9-3.984h-.984v6H18v-6h-3.984v6H3.985v-6h-.984V12l.984-5.016h16.031L21 12v2.016zm-.984-10.032V6H3.985V3.984h16.031z" />
        </Svg>
    )
}

export default Agency
