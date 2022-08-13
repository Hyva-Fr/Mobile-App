import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Exit(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={Css().root.darkGrey} d="M3.984 5.016v13.969H12v2.016H3.984q-.797 0-1.383-.609t-.586-1.406V5.017q0-.797.586-1.406t1.383-.609H12v2.016H3.984zm13.032 1.968L21.985 12l-4.969 5.016-1.406-1.453 2.578-2.578H8.016v-1.969h10.172L15.61 8.391z" />
        </Svg>
    )
}

export default Exit
