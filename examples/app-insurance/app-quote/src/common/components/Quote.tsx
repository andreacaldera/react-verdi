import * as React from "react";

export interface QuoteProps { compiler: string; framework: string; }

export class Quote extends React.Component<QuoteProps, {}> {
  render() {
      return (
        <div className="quote">
          Web site coming soon, please call us to get a quote.
        </div>
      );
  }
}