import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        {/* Birdseed Widget */}
        <script
          defer
          id="io.birdseed.script-tag"
          type="text/javascript"
          src="https://cdn.birdseed.io/widget.js"
        ></script>
        <div
          id="birdseed-widget-container"
          data-token="64c3d69ae1d63222e211a82aefc2ea8f"
        ></div>
        {/* Swarmify Plugin */}
        <script
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: `
                var swarmoptions = {
                  swarmcdnkey: "ab83abaa-95b5-4572-8be3-33aa4357e304",
                  iframeReplacement: "iframe",
                  autoreplace: {
                      youtube: true
                  },
                  theme: {
                      button: "circle",
                      primaryColor: "#319795"
                  }
                };
                  `
          }}
        />
        <script
          async
          data-cfasync="false"
          src="https://assets.swarmcdn.com/cross/swarmdetect.js"
        ></script>
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
};
