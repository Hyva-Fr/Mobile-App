import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Camera(props) {

    const active = props.active !== 'Camera' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M12 17.016q2.063 0 3.539-1.477T17.016 12t-1.477-3.539T12 6.984 8.461 8.461 6.984 12t1.477 3.539T12 17.016zm-3-15h6l1.828 1.969h3.188q.797 0 1.383.609T21.985 6v12q0 .797-.586 1.406t-1.383.609H3.985q-.797 0-1.383-.609T2.016 18V6q0-.797.586-1.406t1.383-.609h3.188zM8.813 12q0-1.313.938-2.25t2.25-.938 2.25.938.938 2.25-.938 2.25-2.25.938-2.25-.938T8.813 12z" />
        </Svg>
    )
}

export default Camera
