/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import Image from "@theme/IdealImage";
import clsx from "clsx";
import * as d3 from "d3";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Tags as ToolsTags } from "../../../data/builder-tools";
import { Tags as ShowcaseTags } from "../../../data/showcases";
import Tooltip from "../ShowcaseTooltip/index";

import Fav from "../../../svg/fav.svg";
import styles from "./styles.module.css";

const TagComp = forwardRef(({ label, color, description }, ref) => (
  <li className={styles.tag} title={description}>
    <span className={styles.textLabel}>{label.toLowerCase()}</span>
    <span className={styles.colorLabel} style={{ backgroundColor: color }} />
  </li>
));

function ShowcaseCardTag({ tags }) {
  const location = useLocation();
  const selectedTags = location.pathname.includes("tools")
    ? ToolsTags
    : ShowcaseTags;
  const tagObjects = tags.map((tag) => ({ tag, ...selectedTags[tag] }));

  return (
    <>
      {tagObjects.map((tagObject, index) => {
        const id = `showcase_card_tag_${tagObject.tag}`;

        return (
          <Tooltip
            key={index}
            text={tagObject.description}
            anchorEl="#__docusaurus"
            id={id}
          >
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        );
      })}
    </>
  );
}

function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

const maxTextLength = 10;
const nodeRadius = 17.25 * 1.5;

const ShowcaseCard = memo(
  ({ showcase, isExpanded, onToggle, onChildClick }) => {
    const [selectedRelease, setSelectedRelease] = useState(
      showcase?.releases?.[0]
    );
    const [showTraitMatrix, setShowTraitMatrix] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const treeContainerRef = useRef(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
      if (isExpanded && treeContainerRef.current) {
        drawRadialTreeGraphWithPacking(selectedRelease);
      }
    }, [isExpanded, selectedRelease, currentPage, itemsPerPage]);

    const handleReleaseChange = useCallback(
      (event) => {
        const selectedVersion = event.target.value;
        const newSelectedRelease = showcase?.releases?.find(
          (release) => release.version === selectedVersion
        );
        setSelectedRelease(newSelectedRelease);
        setCurrentPage(1);
      },
      [showcase?.releases]
    );

    const handleNextPage = useCallback(() => {
      setCurrentPage((prevPage) => prevPage + 1);
    }, []);

    const handlePrevPage = useCallback(() => {
      setCurrentPage((prevPage) => prevPage - 1);
    }, []);

    const drawRadialTreeGraphWithPacking = (release) => {
      d3.select(treeContainerRef.current).selectAll("*").remove();

      const totalDependencies = release.dependencies.length;
      const totalPages = Math.ceil(totalDependencies / itemsPerPage);
      const paginatedDependencies = release.dependencies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

      const width = 800;
      const height = 400 / 1.6;

      const svg = d3
        .select(treeContainerRef.current)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("preserveAspectRatio", "xMidYMid meet");

      const treeData = {
        name: showcase.title,
        children: paginatedDependencies.map((dep) => ({ name: dep })),
      };

      const root = d3.hierarchy(treeData);
      const treeLayout = d3
        .cluster()
        .size([2 * Math.PI, Math.min(width, height) / 2 - 60]);

      treeLayout(root);

      const nodes = root.descendants();
      const aspectRatioFactor = width / height;

      const simulation = d3
        .forceSimulation(nodes)
        .force("center", d3.forceCenter(0, 0))
        .force(
          "charge",
          d3.forceManyBody().strength(totalDependencies === 1 ? -150 : -30)
        )
        .force(
          "collide",
          d3
            .forceCollide()
            .radius(totalDependencies === 1 ? nodeRadius * 3.5 : nodeRadius)
        )
        .force(
          "x",
          d3
            .forceX()
            .strength(0.3)
            .x((d) => d.x * aspectRatioFactor)
        )
        .force(
          "y",
          d3
            .forceY()
            .strength(0.3)
            .y((d) => d.y)
        )
        .on("tick", ticked);

      function ticked() {
        svg.selectAll(".link").remove();
        svg.selectAll(".node").remove();

        svg
          .selectAll(".link")
          .data(root.links())
          .enter()
          .append("path")
          .attr("class", "link")
          .attr("fill", "none")
          .attr("stroke", "#0438af")
          .attr("stroke-width", 2)
          .attr("d", (d) => {
            return `M${d.source.x * aspectRatioFactor},${d.source.y}L${
              d.target.x * aspectRatioFactor
            },${d.target.y}`;
          });

        const node = svg
          .selectAll(".node")
          .data(nodes)
          .enter()
          .append("g")
          .attr("class", "node")
          .attr(
            "transform",
            (d) => `translate(${d.x * aspectRatioFactor},${d.y})`
          )
          .style("cursor", "pointer")
          .on("click", function (event, d) {
            if (d.depth === 0) {
              setShowTraitMatrix(true);
            } else {
              onChildClick(d.data.name);
            }
          })
          .on("mouseover", function (event, d) {
            if (d.depth !== 0) {
              d3.select(this)
                .select("circle")
                .transition()
                .duration(200)
                .attr("fill", "#A9C9FF")
                .attr("stroke-width", 4);
            }

            const tooltip = tooltipRef.current;
            tooltip.innerHTML = d.data.name;
            tooltip.style.visibility = "visible";

            const containerRect =
              treeContainerRef.current.getBoundingClientRect();
            tooltip.style.top = `${event.clientY - containerRect.top + 10}px`;
            tooltip.style.left = `${event.clientX - containerRect.left + 10}px`;
          })
          .on("mouseout", function (event, d) {
            if (d.depth !== 0) {
              d3.select(this)
                .select("circle")
                .transition()
                .duration(200)
                .attr("fill", "white")
                .attr("stroke-width", 2);
            }

            const tooltip = tooltipRef.current;
            tooltip.style.visibility = "hidden";
          });

        node
          .append("circle")
          .attr("r", nodeRadius)
          .attr("fill", (d) => (d.depth === 0 ? "#0438af" : "white"))
          .attr("stroke", "#0438af")
          .attr("stroke-width", 2);

        node
          .append("text")
          .attr("dy", "0.31em")
          .attr("x", 0)
          .attr("text-anchor", "middle")
          .text((d) => truncateText(d.data.name, maxTextLength))
          .attr("font-size", "8px")
          .attr("font-family", "sans-serif")
          .attr("fill", (d) => (d.depth === 0 ? "white" : "#333"));

        nodes.forEach((d) => {
          const maxX = (width / 2 - nodeRadius) / aspectRatioFactor;
          const maxY = height / 2 - nodeRadius;

          if (d.depth === 0) {
            d.x = 0;
            d.y = 0;
          } else {
            d.x = Math.max(-maxX, Math.min(maxX, d.x));
            d.y = Math.max(-maxY, Math.min(maxY, d.y));
          }
        });
      }
    };

    const generateTraitMatrix = (releases) => {
      const traitsSet = new Set();
      const dependenciesSet = new Set();

      releases?.forEach((release) => {
        release.traits.forEach((trait) => traitsSet.add(trait));
        release.dependencies.forEach((dep) => dependenciesSet.add(dep));
      });

      const traits = Array.from(traitsSet);
      const dependencies = Array.from(dependenciesSet);

      const matrix = dependencies.map((dep) => {
        return traits.map((trait) => {
          const matchingRelease = releases.find(
            (release) =>
              release.dependencies.includes(dep) &&
              release.traits.includes(trait)
          );
          return matchingRelease ? matchingRelease.version : "";
        });
      });

      return { traits, dependencies, matrix };
    };

    const { traits, dependencies, matrix } = generateTraitMatrix(
      showcase?.releases
    );

    return (
      <li
        className={clsx(
          "card shadow--md",
          isExpanded ? styles.fullWidthCard : ""
        )}
      >
        <div className={clsx("card__image", styles.showcaseCardImage)}>
          <Image img={showcase.preview} alt={showcase.title} />
        </div>
        <div className="card__body">
          <div className={clsx(styles.showcaseCardHeader)}>
            <h4 className={styles.showcaseCardTitle}>
              <Link href={showcase.website}>{showcase.title}</Link>
            </h4>
            {showcase.tags.includes("favorite") && (
              <Fav className={styles.svgIconFavorite} size="small" />
            )}
            {showcase.getstarted && (
              <Link
                href={showcase.getstarted}
                className={clsx(
                  "button button--secondary button--sm",
                  styles.showcaseCardSrcBtn
                )}
              >
                Get Started
              </Link>
            )}
          </div>
          <p className={styles.showcaseCardBody}>{showcase.description}</p>

          {showcase?.releases && (
            <div className={styles.treeContainerWrapper}>
              <div ref={tooltipRef} className={styles.customTooltip} />

              <div className={styles.toggleAndDropdownWrapper}>
                <button
                  onClick={onToggle}
                  className={clsx(
                    "button button--primary button--sm",
                    styles.toggleButton
                  )}
                >
                  {isExpanded ? "Hide Details" : "Show Dependencies"}
                </button>

                {isExpanded && (
                  <div className={styles.releaseDropdown}>
                    <label htmlFor="release-select">Select Release: </label>
                    <select
                      id="release-select"
                      value={selectedRelease.version}
                      onChange={handleReleaseChange}
                    >
                      {showcase.releases.map((release) => (
                        <option key={release.version} value={release.version}>
                          {release.version} {release.latest ? "(Latest)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {isExpanded && (
                <div className={styles.svgWrapper}>
                  <svg ref={treeContainerRef} className={styles.treeSvg}></svg>

                  {/* Trait Matrix, now inside the SVG Wrapper */}

                  {showTraitMatrix && (
                    <div
                      className={clsx(
                        styles.traitMatrixContainer,
                        showTraitMatrix ? styles.traitMatrixVisible : ""
                      )}
                    >
                      <h3>Trait Matrix</h3>

                      <button
                        className={styles.closeButton}
                        onClick={() => setShowTraitMatrix(false)}
                      >
                        Close
                      </button>

                      {/* Trait Matrix Table */}
                      <table className={styles.traitMatrixTable}>
                        <thead>
                          <tr>
                            <th></th>
                            {traits.map((trait, index) => (
                              <th key={index}>{trait}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {dependencies.map((dependency, rowIndex) => (
                            <tr key={rowIndex}>
                              <td>{dependency}</td>
                              {matrix[rowIndex].map((cell, colIndex) => (
                                <td key={colIndex}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {selectedRelease.dependencies.length > itemsPerPage && (
                    <>
                      {currentPage > 1 && (
                        <button
                          className={clsx(
                            styles.prevButton,
                            styles.paginationButton
                          )}
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      )}
                      {currentPage <
                        Math.ceil(
                          selectedRelease.dependencies.length / itemsPerPage
                        ) && (
                        <button
                          className={clsx(
                            styles.nextButton,
                            styles.paginationButton
                          )}
                          onClick={handleNextPage}
                        >
                          Next
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <ul className={clsx("card__footer", styles.cardFooter)}>
          <ShowcaseCardTag tags={showcase.tags} />
        </ul>
      </li>
    );
  }
);

export default ShowcaseCard;
