import * as React from "react";

const FlashLight: React.FC<React.SVGProps<SVGSVGElement>> = (
  props: React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={800}
    height={800}
    viewBox="0 0 297 297"
    {...props}
  >
    <path d="m283.715 218.928-84.241-84.24c3.593-18.175 2.266-37.227-5.007-51.345-8.901-17.275-23.128-23.41-24.72-24.053a12.864 12.864 0 0 0-13.906 2.833L62.8 155.162a12.86 12.86 0 0 0-2.994 13.484c.602 1.658 6.386 16.293 23.884 25.308 8.919 4.595 20.006 6.861 32.064 6.861h.005c6.506 0 13.069-.531 19.464-1.826l83.959 84.04a45.593 45.593 0 0 0 32.303 13.41c11.649 0 23.287-4.406 32.143-13.262 8.592-8.591 13.341-19.981 13.373-32.09.031-12.145-4.687-23.559-13.286-32.159zm-167.961-43.834c-7.977 0-14.991-1.278-20.284-4.006-3.055-1.574-5.387-3.381-7.129-5.174l78.085-78.042c1.758 1.799 3.606 4.185 5.175 7.231 8.897 17.269 3.017 49.656-11.651 64.324-9.315 9.315-27.487 15.667-44.191 15.667h-.005zm149.685 89.916c-7.716 7.715-20.307 7.676-28.07-.087l-75.356-75.355c6.165-3.343 11.656-7.312 16.124-11.779 4.58-4.58 8.538-10.11 11.837-16.224l75.552 75.551c3.722 3.723 5.766 8.664 5.751 13.914-.013 5.264-2.086 10.228-5.838 13.98z" />
    <path d="M214.348 195.733c-5.024-5.022-13.166-5.022-18.188 0-5.023 5.023-5.023 13.166 0 18.188l23.085 23.084a12.824 12.824 0 0 0 9.094 3.767 12.82 12.82 0 0 0 9.094-3.767c5.023-5.023 5.023-13.166 0-18.188l-23.085-23.084zM85.632 103.393a12.82 12.82 0 0 0 9.094 3.767c3.291 0 6.583-1.256 9.094-3.767 5.023-5.023 5.023-13.165 0-18.188L54.852 36.236c-5.023-5.023-13.165-5.023-18.188 0s-5.023 13.165 0 18.188l48.968 48.969zM77.166 127.607c0-7.103-5.758-12.861-12.861-12.861H12.861C5.758 114.746 0 120.504 0 127.607c0 7.103 5.758 12.861 12.861 12.861h51.444c7.103 0 12.861-5.758 12.861-12.861zM127.67 75.748c7.103 0 12.861-5.758 12.861-12.861V13.422c0-7.103-5.758-12.861-12.861-12.861s-12.861 5.758-12.861 12.861v49.465c0 7.103 5.758 12.861 12.861 12.861z" />
  </svg>
);
export default FlashLight;