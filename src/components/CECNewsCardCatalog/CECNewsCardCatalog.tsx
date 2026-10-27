/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */
import "./CECNewsCardCatalog.scss";
import React, { useEffect, useMemo, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getColNumber,
  getLinkTarget,
} from "../../utilities";
import {
  renderEditButton,
} from "../../utilities/BasicComponent/BasicComponent";
import DXTaxonomyFilter, {
  TaxFilterProps,
  TaxonomyFilterProps,
} from "../DXTaxonomyFilter/DXTaxonomyFilter";
import {
  generateSummary,
  extractFirstImageFromContent,
  unwrapDXProps,
  decodeHtmlEntities,
  stripHtml,
  isFalsyImageUrl,
  safeParseDXDate,
  toTagArray,
  formatSmartDate
} from "../../utilities/cec-utils";
import CECPagination from "../CECPagination/CECPagination";
import {
  BlogCardProps,
  CECNewsCardCatalogProps as ExternalCECNewsCardCatalogProps,
} from "./CECNewsCardCatalog.types";
const BlogCard = ( props: BlogCardProps ) => {
  const [loaded, setLoaded] = useState( false );
  const safeTags = useMemo( () => toTagArray( props.tags ), [props.tags] );
  return (
    <article className="blogCard" role="article" data-build="cec-news-1.5.0">
      {/* STRICT image guard */}
      {!isFalsyImageUrl( props.image?.url ) && (
        <div className="blogCard__thumbnailContainer">
          <div className={`loader__container ${loaded ? "d-none" : ""}`}>
            <span className="loader"></span>
          </div>
          <img
            className="blogCard__thumbnail"
            src={props.image!.url as string}
            loading="lazy"
            onLoad={() => setLoaded( true )}
            alt={props.image?.altText || props.link?.label || "News Image"}
          />
        </div>
      )}
      <div className="blogCard__secondary">
        <div className="blogCard__newsTitle">
          <a href={props.link?.url || "#"} target={getLinkTarget( props.link?.target )}>
            {props.link?.label || "Untitled Post"}
          </a>
        </div>
        {props.summary && <p className="blogCard__summary">{props.summary}</p>}
        {safeTags.length > 0 && (
          <div className="blogCard__tagsContainer">
            {safeTags.map( ( tag, i ) => (
              <span key={i} className="blogCard__tagChip">{tag}</span>
            ) )}
          </div>
        )}
        <div className="blogCard__textContainer">
          <span className="blogCard__newsDate">
            {formatSmartDate( props.date )}
          </span>
        </div>
      </div>
    </article>
  );
};
type CECNewsCardCatalogProps = Partial<ExternalCECNewsCardCatalogProps> & {
  items?: unknown;
};
// Type guard function to validate items
function isValidItems( items: unknown ): items is BlogCardProps[] {
  return Array.isArray( items ) && items.every( item =>
    typeof item === 'object' &&
    item !== null &&
    'link' in item &&
    'date' in item
  );
}
const DEFAULT_DATE_FORMAT = "MM/DD/YY";
const DEFAULT_FILTER_TYPE = "select";
const DEFAULT_PAGINATION = { sets: ["3", "6", "9"], active: 1, activeSet: 6 };
const CECNewsCardCatalog = ( rawProps: CECNewsCardCatalogProps ) => {
  const props = unwrapDXProps<CECNewsCardCatalogProps>( rawProps );
  const {
    items,
    summaryLength = 120,
    filterType = DEFAULT_FILTER_TYPE,
    totalItems,
    dateFormat = DEFAULT_DATE_FORMAT,
    elementsPerRow = 1,
    hideFilters = false,
    searchLabel = "",
    searchPlaceholder = "",
    paginationProps = DEFAULT_PAGINATION,
    tagFilter, // optional pre-filter
    numberOfItems, // NEW: cap after tagFilter, before taxonomy/pagination
    _edit,
  } = props;
  // Normalize the incoming tagFilter into a Set of lowercased tokens.
  const filterTokens = useMemo<Set<string> | null>( () => {
    if ( !tagFilter ) return null;
    const arr = Array.isArray( tagFilter ) ? tagFilter : String( tagFilter ).split( "," );
    const cleaned = arr.map( t => t.trim().toLowerCase() ).filter( Boolean );
    return cleaned.length ? new Set( cleaned ) : null;
  }, [tagFilter] );
  // Sanitize numberOfItems -> non-negative integer; Infinity = no cap
  const maxItems = useMemo( () => {
    if ( typeof numberOfItems !== "number" || !Number.isFinite( numberOfItems ) ) return Number.POSITIVE_INFINITY;
    return Math.max( 0, Math.floor( numberOfItems ) );
  }, [numberOfItems] );
  const processedItems: BlogCardProps[] = useMemo( () => {
    let arr: unknown = items;
    if ( typeof arr === "string" ) {
      try {
        arr = JSON.parse( arr );
      } catch {
        arr = [];
      }
    }
    if ( !Array.isArray( arr ) ) return [];
    // Type guard to validate array items
    function isValidItem( item: unknown ): item is BlogCardProps {
      return typeof item === 'object' &&
        item !== null &&
        'link' in item &&
        'date' in item;
    }
    // Normalize every item
    const normalized: BlogCardProps[] = arr.map( ( item: unknown, index: number ) => {
      if ( !isValidItem( item ) ) {
        // Return a default BlogCardProps for invalid items
        return {
          link: { url: '#', label: 'Untitled Post', target: '_self' },
          date: new Date().toISOString(),
          index,
        };
      }
      const rawContent = ( typeof item.content === "string" && item.content !== "null" ) ? item.content : "";
      const decodedContent = decodeHtmlEntities( rawContent );
      // image: drop invalids; try extract from decoded content
      let imageUrl: string | undefined = item.image?.url ?? undefined;
      if ( isFalsyImageUrl( imageUrl ) ) {
        const found = extractFirstImageFromContent( decodedContent );
        if ( !isFalsyImageUrl( found ) ) imageUrl = found || undefined;
        else imageUrl = undefined;
      }
      // tags -> clean array
      const tagsArray = toTagArray( item?.tags );
      // summary from decoded HTML, always plain text
      let summary = generateSummary( decodedContent, summaryLength );
      summary = decodeHtmlEntities( summary );
      if ( /<[^>]+>/.test( summary ) ) summary = stripHtml( summary );
      return {
        ...item,
        image: imageUrl ? { url: imageUrl } : undefined,
        content: decodedContent,
        summary,
        tags: tagsArray,
        index,
      } as BlogCardProps;
    } );
    // Apply tagFilter (ANY match, case-insensitive) BEFORE taxonomy/pagination
    const preFiltered = filterTokens
      ? normalized.filter( ( it ) => {
        const have = toTagArray( it.tags ).map( t => t.toLowerCase() );
        return have.some( t => filterTokens.has( t ) );
      } )
      : normalized;
    // Apply numberOfItems cap AFTER tagFilter, BEFORE taxonomy/pagination
    const capped = preFiltered.slice( 0, maxItems );
    return capped;
  }, [items, summaryLength, filterTokens, maxItems] );
  const [filteredItems, setFilteredItems] = useState( processedItems );
  const [filteredCount, setFilteredCount] = useState( processedItems.length );
  const [active, setActive] = useState( paginationProps.active ?? 1 );
  const [activeSet, setActiveSet] = useState( paginationProps.activeSet ?? 6 );
  useEffect( () => {
    setFilteredItems( processedItems );
    setFilteredCount( processedItems.length );
    setActive( 1 );
  }, [processedItems] );
  const getTaxonomies = (): TaxFilterProps[] => {
    const tax: TaxFilterProps[] = [];
    // tags
    const tagSet = new Set<string>();
    processedItems.forEach( i => toTagArray( i.tags ).forEach( t => tagSet.add( t ) ) );
    if ( tagSet.size ) {
      tax.push( {
        label: "tags",
        attribute: "tags",
        type: filterType,
        values: Array.from( tagSet ).sort(),
      } );
    }
    // years — parse via safeParseDXDate so "May 27, 2025, ..." works
    const yearSet = new Set<string>();
    processedItems.forEach( i => {
      const d = safeParseDXDate( i.date );
      if ( d ) yearSet.add( String( d.getFullYear() ) );
    } );
    if ( yearSet.size ) {
      tax.push( {
        label: "year",
        attribute: "date",
        type: filterType,
        values: Array.from( yearSet ).sort(),
      } );
    }
    return tax;
  };
  const filterItems = ( selected: string[] ) => {
    if ( !selected?.length ) {
      setFilteredItems( processedItems );
      setFilteredCount( processedItems.length );
      setActive( 1 );
      return;
    }
    const map = new Map<string, Set<string>>();
    selected.forEach( f => {
      const [k, v] = f.split( /:(.*)/s );
      if ( !k || !v ) return;
      const val = v.toLowerCase();
      if ( !map.has( k ) ) map.set( k, new Set<string>() );
      map.get( k )!.add( val );
    } );
    const next = processedItems.filter( item => {
      if ( map.has( "search" ) ) {
        const q = ( Array.from( map.get( "search" )! )[0] || "" ) as string;
        if ( !( item.link?.label || "" ).toLowerCase().includes( q ) ) return false;
      }
      if ( map.has( "tags" ) ) {
        const need = map.get( "tags" )!;
        const have = toTagArray( item.tags ).map( t => t.toLowerCase() );
        if ( !have.some( t => need.has( t ) ) ) return false;
      }
      if ( map.has( "year" ) && item.date ) {
        const d = safeParseDXDate( item.date );
        if ( !d || !map.get( "year" )!.has( String( d.getFullYear() ).toLowerCase() ) ) return false;
      }
      return true;
    } );
    setFilteredItems( next );
    setFilteredCount( next.length );
    setActive( 1 );
  };
  const taxonomyProps: TaxonomyFilterProps = {
    totalItems: totalItems ?? processedItems.length,
    filters: getTaxonomies(),
    filteredCount,
    filterItems,
    searchLabel,
    searchPlaceholder,
  };
  const onChangeActive = ( page: number ) => setActive( page );
  const onChangeSet = ( itemsPerPage: number ) => {
    setActiveSet( itemsPerPage );
    setActive( 1 );
  };
  const currentPageItems = useMemo( () => {
    const end = active * activeSet;
    const start = end - activeSet;
    return filteredItems.slice( start, end );
  }, [filteredItems, active, activeSet] );
  return (
    <div
      className="cecNewsCardCatalog"
      data-testid="cec-news-card-catalog"
      data-build="cec-news-1.5.0"
      data-filter={Array.isArray( tagFilter ) ? tagFilter.join( "," ) : ( tagFilter || "" )}
      data-maxitems={Number.isFinite( maxItems ) ? maxItems : "∞"}
    >
      {!hideFilters && <DXTaxonomyFilter {...taxonomyProps} />}
      <div className="cecNewsCardCatalog__container">
        <Row>
          {currentPageItems.map( ( item, index ) => (
            <Col
              xs={12}
              key={`index-${index}`}
              className="cecNewsCardCatalog__item"
              {...getColNumber( elementsPerRow )}
            >
              <BlogCard {...item} />
            </Col>
          ) )}
        </Row>
      </div>
      {filteredItems.length > 0 && (
        <CECPagination
          currentPage={active}
          totalPages={Math.ceil( filteredItems.length / activeSet )}
          onPageChange={onChangeActive}
          itemsPerPage={activeSet}
          onItemsPerPageChange={onChangeSet}
          totalItems={filteredItems.length}
          itemsPerPageOptions={paginationProps.sets?.map( s => parseInt( s, 10 ) ) || [3, 6, 9]}
          showItemsPerPageDropdown={true}
          showPageInfo={true}
          variant="default"
        />
      )}
      {_edit && renderEditButton( _edit )}
    </div>
  );
};
export default CECNewsCardCatalog;
