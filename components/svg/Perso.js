import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Perso(props) {

    const active = props.active !== 'Perso' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M17.016 17.016v-1.5q0-1.125-1.711-1.828T12 12.985t-3.305.703-1.711 1.828v1.5h10.031zM12 6.75q-.938 0-1.594.656T9.75 9t.656 1.594T12 11.25t1.594-.656T14.25 9t-.656-1.594T12 6.75zm8.016-2.766q.797 0 1.383.609t.586 1.406v12q0 .797-.586 1.406t-1.383.609H3.985q-.797 0-1.383-.609t-.586-1.406v-12q0-.797.586-1.406t1.383-.609h16.031zM3.984 24v-2.016h16.031V24H3.984zM20.016 0v2.016H3.985V0h16.031z" />
        </Svg>
    )
}

export default Perso
