import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Password(props) {

    const active = props.active !== 'Password' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M12 .984L3 5.015v6q0 2.063.68 4.008t1.898 3.586 2.859 2.789T12 23.015q1.922-.469 3.563-1.617t2.859-2.789 1.898-3.586.68-4.008v-6L12 .984zm-.984 6h1.969V9h-1.969V6.984zm0 4.032h1.969v6h-1.969v-6z" />
        </Svg>
    )
}

export default Password
