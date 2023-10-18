import { useMatches as Rrd_useMatches } from "react-router-dom"
import { RouteMatch } from "../types/common"

export const useMatches = () => Rrd_useMatches() as RouteMatch[];
