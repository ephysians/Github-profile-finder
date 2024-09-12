const ProfileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      width="60"
      height="60"
      viewBox="0 0 256 256"
      xmlSpace="preserve"
    >
      <defs></defs>
      <g
        style={{
          stroke: "none",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "none",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="translate(45.02412451361867 45.024124513618645) scale(1.83 1.83)"
      >
        {/* Circle with color #93c5fd */}
        <circle
          cx="45"
          cy="45"
          r="45"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "#93c5fd", // Changed to #93c5fd
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="matrix(1 0 0 1 0 0)"
        />

        {/* Image/Face inside circle with color #5f82a9 */}
        <path
          d="M 45 54.287 c -8.9 0 -16.14 -7.24 -16.14 -16.14 S 36.1 22.007 45 22.007 c 8.899 0 16.14 7.241 16.14 16.14 S 53.899 54.287 45 54.287 z"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "#5f82a9", // Changed to #5f82a9
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="matrix(1 0 0 1 0 0)"
        />

        {/* Additional path (assuming image/face feature) with color #5f82a9 */}
        <path
          d="M 72.957 71.22 c -3.177 -5.75 -8.143 -10.477 -14.049 -13.341 c -2.008 -0.974 -4.352 -0.959 -6.436 0.041 c -2.343 1.126 -4.857 1.696 -7.473 1.696 c -2.616 0 -5.13 -0.571 -7.473 -1.696 c -2.081 -0.999 -4.426 -1.015 -6.435 -0.041 c -5.906 2.864 -10.872 7.59 -14.05 13.341 C 23.877 78.957 33.865 83.843 45 83.843 C 56.135 83.843 66.123 78.957 72.957 71.22 z"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "#5f82a9", // Changed to #5f82a9
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="matrix(1 0 0 1 0 0)"
        />
      </g>
    </svg>
  );
};

export default ProfileIcon;
