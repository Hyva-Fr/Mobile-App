import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from "../../utils/CSS";

function Excel(props) {

    const active = props.active !== 'Excel' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 32 32"
            {...props}
        >
            <Path fill={fill} d="M23.22 12h-4.228L16 16.407 13.008 12H8.78l5.068 7.577L8.13 28H16v-2.862h-1.567L16 22.794l3.481 5.205h4.389l-5.718-8.423 5.068-7.577z" />
            <Path fill={fill} d="M28.681 7.159c-.694-.947-1.662-2.053-2.724-3.116s-2.169-2.03-3.116-2.724C21.229.137 20.448 0 20 0H4.5A2.503 2.503 0 002 2.5v27C2 30.878 3.121 32 4.5 32h23c1.378 0 2.5-1.122 2.5-2.5V10c0-.448-.137-1.23-1.319-2.841zm-4.138-1.702A27.334 27.334 0 0126.811 8H22V3.189a27.334 27.334 0 012.543 2.268zM28 29.5c0 .271-.229.5-.5.5h-23a.507.507 0 01-.5-.5v-27c0-.271.229-.5.5-.5H20v7a1 1 0 001 1h7v19.5z" />
        </Svg>
    )
}

export default Excel
