/**
 * External dependencies
 */
import classnames from "classnames";
import Masonry from "react-responsive-masonry";

/**
 * Internal dependencies
 */
import {
  GalleryClasses,
  GalleryStyles,
} from "../../../utils/components/block-gallery/shared";

/**
 * WordPress dependencies
 */
import { RichText } from "@wordpress/block-editor";

const save = ({ attributes, className }) => {
  const {
    // existing attrs from released build
    captions,
    gutter,
    gutterMobile,
    gutterTablet,
    linkTo,
    lightbox,
    rel,
    target,
    columnsize,
    customHeight,
    customWidth,
    images,
    block_id,

    // new filter attrs
    enableCategoryFilter,
    allTabLabel = "All",
    setDefaultCategory,
    defaultCategory,
    enableResponsiveSupport,
    captionStyle = "dark",
  } = attributes;

  if (!images || images.length === 0) return null;

  // keep the same class helpers you had before
  const innerClasses = classnames(...GalleryClasses(attributes), {
    "has-gutter": gutter > 0,
    "has-lightbox": lightbox,
  });

  const masonryClasses = classnames({
    [`has-gutter-${gutter}`]: gutter > 0,
    [`has-gutter-mobile-${gutterMobile}`]: gutterMobile > 0,
    [`has-gutter-tablet-${gutterTablet}`]: gutterTablet > 0,
  });

  const masonryStyles = {
    ...GalleryStyles(attributes),
  };

  // maintain editor/order behavior
  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  const appendClass = `block-${block_id}`;
  let outerClasses = classnames(className, appendClass);

  // keep caption style modifier like your filter version
  if (captions) {
    outerClasses += ` has-caption-style-${captionStyle}`;
  }

  // categories for filter bar
  const categories = Array.from(
    new Set(
      sortedImages
        .map((img) => img.rba_category || "uncategorized")
        .filter((c) => c && c !== "uncategorized")
    )
  );

  const shouldShowFilters = enableCategoryFilter && categories.length > 0;
  const defaultActiveCategory =
    setDefaultCategory && defaultCategory ? defaultCategory : "All";

  return (
    <div className={outerClasses} data-rba-gallery-block>
      {shouldShowFilters && (
        <div
          className={`gallery-filter-wrapper ${
            enableResponsiveSupport ? "has-responsive-support" : ""
          }`}
        >
          {/* Desktop tabs */}
          <div className="rba-gf-tabs">
            <button
              className={`gallery-filter-button ${
                defaultActiveCategory === "All" ||
                defaultActiveCategory === "all"
                  ? "is-active"
                  : ""
              }`}
              data-category="All"
            >
              {allTabLabel}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter-button ${
                  defaultActiveCategory === cat ? "is-active" : ""
                }`}
                data-category={cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile dropdown (CSS-driven) */}
          {enableResponsiveSupport && (
            <details className="rba-gf-dropdown">
              <summary className="gallery-filter-button rba-gf-toggle">
                {defaultActiveCategory === "All" ||
                defaultActiveCategory === "all"
                  ? allTabLabel
                  : defaultActiveCategory}
              </summary>
              <ul className="rba-gf-menu">
                <li>
                  <button
                    className={`gallery-filter-button dropdown-item ${
                      defaultActiveCategory === "All" ||
                      defaultActiveCategory === "all"
                        ? "is-active"
                        : ""
                    }`}
                    data-category="All"
                  >
                    {allTabLabel}
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      className={`gallery-filter-button dropdown-item ${
                        defaultActiveCategory === cat ? "is-active" : ""
                      }`}
                      data-category={cat}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      {/* Masonry layout retained (like released version) */}
      <div className={innerClasses}>
        <Masonry className={masonryClasses} columnsCount={columnsize} style={masonryStyles}>
          {sortedImages.map((image, index) => {
            // href logic unchanged from released version
            let href;
            switch (linkTo) {
              case "media":
                href = image.url;
                break;
              case "attachment":
                href = image.link;
                break;
            }
            if (image.imgLink) href = image.imgLink;
            if (lightbox) href = "";

            const img = (
              <img
                style={{
                  width: customWidth || undefined,
                  height: customHeight || undefined,
                }}
                src={image.url}
                alt={image.alt || ""}
                data-id={image.id}
                data-imglink={image.imgLink}
                data-link={image.link}
                data-order={image.order !== undefined ? image.order : index}
                data-category={image.rba_category || "uncategorized"}
                className={image.id ? `wp-image-${image.id}` : undefined}
              />
            );

            const imageCategory = image.rba_category || "uncategorized";
            const visibleByDefault =
              defaultActiveCategory === "All" ||
              defaultActiveCategory === "all" ||
              defaultActiveCategory === imageCategory;

            return (
              <li
                key={image.id || image.url}
                className={classnames(
                  "responsive-block-editor-addons-gallery--item",
                  { "is-hidden-by-default": !visibleByDefault }
                )}
                data-category={imageCategory}
              >
                <figure
                  className={classnames(
                    "responsive-block-editor-addons-gallery--figure",
                    { "has-lightbox": !!lightbox }
                  )}
                >
                  {href && linkTo === "custom" ? (
                    <a href={href} target={target || ""} rel={rel || ""}>
                      {img}
                    </a>
                  ) : (
                    img
                  )}

                  {captions && image.caption && image.caption.length > 0 && (
                    <RichText.Content
                      tagName="figcaption"
                      className="responsive-block-editor-addons-gallery--caption"
                      value={image.caption}
                    />
                  )}
                </figure>
              </li>
            );
          })}
        </Masonry>
      </div>
    </div>
  );
};

export default save;
