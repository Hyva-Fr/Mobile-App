import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from "../../utils/CSS";

function Folder(props) {

    const active = props.active !== 'Folder' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M9.984 3.984L12 6h8.016q.797 0 1.383.609t.586 1.406v9.984q0 .797-.586 1.406t-1.383.609H3.985q-.797 0-1.383-.609t-.586-1.406v-12q0-.797.586-1.406t1.383-.609h6z" />
        </Svg>
    )
}

export default Folder
