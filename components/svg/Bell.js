import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Bell(props) {

    const active = props.active !== 'Bell' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M17.016 15.984V15l-1.031-.984v-2.625q0-1.641-.773-2.859t-2.227-1.547v-.469q0-.422-.281-.727t-.703-.305-.703.305-.281.727v.469q-1.453.328-2.227 1.547t-.773 2.859v2.625L6.986 15v.984h10.031zM12 18.516q.656 0 1.078-.445t.422-1.055h-3q0 .609.422 1.055t1.078.445zm0-16.5q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055T12 21.986t-7.055-2.93-2.93-7.055 2.93-7.055T12 2.016z" />
        </Svg>
    )
}

export default Bell
