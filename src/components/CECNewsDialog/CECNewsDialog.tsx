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
import React, { useEffect, useCallback } from "react";
import "./CECNewsDialog.scss";
import type { NewsItemProps } from "../../utilities/cec-types";
import {
  decodeHtmlEntities,
  formatSmartDate,
  extractFirstImageFromContent,
  isFalsyImageUrl,
} from "../../utilities/cec-utils";
export interface CECNewsDialogProps {
  open: boolean;
  item?: NewsItemProps;
  onClose: () => void;
  linkTarget?: "_self" | "_blank";
}
const CECNewsDialog: React.FC<CECNewsDialogProps> = ({
  open,
  item,
  onClose,
  linkTarget = "_blank",
}) => {
  const rawTitle = item?.title ?? item?.link?.label ?? "Untitled Post";
  const title = rawTitle.trim();
  const prettyDate = formatSmartDate(item?.publishedDate || item?.date, item?.dateFormat);
  const decodedHtml = decodeHtmlEntities(item?.content || "");
  // Image goes INSIDE the content at the beginning
  const contentImg =
    (!isFalsyImageUrl(item?.image?.url || null) && (item?.image?.url as string)) ||
    extractFirstImageFromContent(decodedHtml) ||
    null;
  const tags = Array.isArray(item?.tags)
    ? item?.tags
    : typeof item?.tags === "string"
    ? item!.tags!.split(/[,+]/).map((t) => t.trim()).filter(Boolean)
    : [];
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);
  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open, onKey]);
  return (
    <div
      className={`newsDialog__overlay${open ? " active" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="newsDialog__dialog">
        <header className="newsDialog__header">
          <div className="newsDialog__headerContent">
            <h3 className="newsDialog__title">{title}</h3>
            {(item?.author?.name || prettyDate) && (
              <p className="newsDialog__meta">
                {item?.author?.name ?? ""}
                {item?.author?.name && prettyDate ? " • " : ""}
                {prettyDate}
              </p>
            )}
          </div>
          <button aria-label="Close" onClick={onClose}>×</button>
        </header>
        <section className="newsDialog__content">
          {contentImg && (
            <figure className="newsDialog__media">
              <img src={contentImg} alt={item?.image?.alt || ""} />
            </figure>
          )}
          <div
            className="newsDialog__rich"
            dangerouslySetInnerHTML={{ __html: decodedHtml }}
          />
        </section>
        <footer className="newsDialog__footer">
          <div className="newsDialog__tags">
            {tags && tags.map((t, i) => (
              <span key={`${t}-${i}`}>{t}</span>
            ))}
          </div>
          {item?.link?.url && (
            <div className="newsDialog__actions">
              <a
                href={item.link.url}
                target={linkTarget}
                rel={linkTarget === "_blank" ? "noopener noreferrer" : undefined}
              >
                Read More →
              </a>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};
export default CECNewsDialog;
