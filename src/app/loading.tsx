
import { BarLoader } from "react-spinners"
export default function Loading() {
    return (
    <div className="h-full flex items-center justify-center">
       <BarLoader className="text-slate-900" />
    </div>
    )
  }