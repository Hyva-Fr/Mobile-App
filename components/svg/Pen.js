import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Pen(props) {

    const active = props.active !== 'Pen' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M11.016 20.016L15 15.985h6v4.031h-9.984zM6.188 18l8.672-8.672-1.219-1.219-8.625 8.672V18h1.172zM18.422 5.813q.609.609.609 1.406t-.609 1.406L7.031 20.016H3v-4.078L14.391 4.594q.609-.609 1.406-.609t1.406.609z" />
        </Svg>
    )
}

export default Pen
