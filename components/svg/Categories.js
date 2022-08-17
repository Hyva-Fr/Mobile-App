import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Categories(props) {

    const active = props.active !== 'Categories' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M21.984 11.016H15v-3h-2.016v7.969H15v-3h6.984v8.016H15v-3h-3.984V8.017H9v3H2.016V3.001H9v3h6v-3h6.984v8.016z" />
        </Svg>
    )
}

export default Categories
