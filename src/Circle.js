import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import * as d3 from "d3"
import useInterval from "./hooks/useInterval"
import generateDataset from "./dataset"

const Circles = () => {
    const [dataset, setDataset] = useState(
      generateDataset()
    )
    const ref = useRef()
  
    useEffect(() => {
      const svgElement = d3.select(ref.current)
      svgElement.selectAll("circle")
        .data(dataset)
        .join("circle")
          .attr("cx", d => d[0])
          .attr("cy", d => d[1])
          .attr("r",  3)
    }, [dataset])
  
    useInterval(() => {
      const newDataset = generateDataset()
      setDataset(newDataset)
    }, 2000)
  
    return (
      <svg
        viewBox="0 0 100 50"
        ref={ref}
      />
    )
  }

export default Circles;