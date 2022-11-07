
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class SpecialDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-100 border-gray-800 dark:border-gray-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default SpecialDocument;