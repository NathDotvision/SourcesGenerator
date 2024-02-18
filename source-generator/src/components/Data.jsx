const Data = {
  name: "SourceGenerator",
  ShortDescriptionEnglish: "A simple generator source like links or videos.",
  LongDescriptionEnglish:
    "Our application is an online tool designed to facilitate the creation of bibliographies for any type of project.",
  ShortDescriptionFrench:
    "Un générateur de sources simple comme des liens ou des vidéos.",
  LongDescriptionFrench:
    "Notre application est un outil en ligne conçu pour faciliter la création de bibliographies pour tout type de projet.",
  ReactImage:
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  NPMImage: "https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg",
  FirebaseImage:
    "https://imgs.search.brave.com/f_mv4NvKzpYym6UDDjaH_CBbUYDWBADmopUV79qJCvo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yYXcu/Z2l0aHVidXNlcmNv/bnRlbnQuY29tL2dp/dGh1Yi9leHBsb3Jl/LzgwNjg4ZTQyOWE3/ZDRlZjJmY2ExZTgy/MzUwZmU4ZTM1MTdk/MzQ5NGQvdG9waWNz/L2ZpcmViYXNlL2Zp/cmViYXNlLnBuZw",
  TailwindImage:
    "https://imgs.search.brave.com/M-y4eFtW0iLiem_QarqonoXy8JBysIPMTTo_6-ZaOoE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL1QvdGFpbHdp/bmQtY3NzLWxvZ28t/NUFENDE3NTg5Ny1z/ZWVrbG9nby5jb20u/cG5n",
  FlatUIColorsImage:
    "https://imgs.search.brave.com/oBLr7Qq9gZc916kKw3bFLmJZOXxBWUsraospS9h-3NE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tYXRl/cmlhbHVpLmNvL2lt/Zy9mbGF0LWNvbG9y/cy5zdmc.svg",
  BlobMakerImage:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzJweCIgaGVpZ2h0PSI3MnB4IiB2aWV3Qm94PSIwIDAgNzIgNzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjMgKDU3NTQ0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BcnRib2FyZCA4IENvcHkgMzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJBcnRib2FyZC04LUNvcHktMyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTEzLjk4MDE5MDIsNDkuNjcxMTgxMyBDNi41MzI2MzgxNCwzNS44MDA0ODAyIDI1LjEzMTgxNTgsNi4wMzc2MTE2MiA0MS44Nzg5NTY4LDUuMDI2ODc4MzYgQzU4LjYyNjA5NzcsNC4wMTYxNDUxMSA3My41MjEyMDE5LDMxLjc1NzU0NzIgNjQuMjIxNjEzLDQ2LjYzODk4MTUgQzU0LjkyMjAyNDIsNjEuNTIwNDE1OCAyMS40Mjc3NDIzLDYzLjU0MTg4MjMgMTMuOTgwMTkwMiw0OS42NzExODEzIFoiIGlkPSJTaGFwZS1Db3B5LTYiIGZpbGw9IiNGRjk5MzMiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgIDxwYXRoIGQ9Ik00MC4xNzkxNTgyLDM1LjYzNzQwNTEgQzQ1LjgxMTg5NTksNDIuMTQyNzk4IDU0Ljc0MDkzNzYsNDYuNTc3MzEyOCA1NS42ODE4OTM5LDUxLjg4ODY3NzcgQzU2LjYyMjg1MDIsNTcuMjAwMDQyNSA0OS41NzU3MjExLDYzLjM4ODI1NzQgNDIuMzA5MjM4Nyw2NS40OTUxMjc3IEMzNS4wNDI3NTY0LDY3LjYwMTk5NzkgMjcuNTU2OTIwNyw2Ni42Mjc1MjM2IDIxLjI5MTE3NTcsNjMuMTk2NDkxIEMxNS4wMjU0MzA3LDU5Ljc2NTQ1ODQgOS45Nzk3NzYzNiw1My44Nzc4Njc0IDcuMTg5ODczNTYsNDYuOTU3NjIwNCBDNC4zOTk5NzA3Niw0MC4wMzczNzMzIDMuODY1ODE5NTMsMzEuMDg0NDcwMSA4LjAyMjM5MTQ1LDI0LjkxNjAwMjMgQzEyLjE3ODk2MzQsMTguNzQ3NTM0NiAyMS4wMjYyNTg0LDE1LjM2MzUwMjMgMjYuNjE4MTIyNywxNy45NTk2MjE3IEMzMi4yMDk5ODcsMjAuNTU1NzQxMSAzNC41NDY0MjA2LDI5LjEzMjAxMjIgNDAuMTc5MTU4MiwzNS42Mzc0MDUxIiBpZD0iU2hhcGUtQ29weS01IiBmaWxsPSIjRkYwMDY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNNTIuNjgyNDQwMiw0My45OTIgQzUyLjY4MjQ0MDIsNTEuMzg0IDQ2LjI1MDQ0MDIsNTQuNiAzOS4yOTA0NDAyLDU0LjYgTDIyLjc3ODQ0MDIsNTQuNiBMMjIuNzc4NDQwMiwxNy4wMTYgTDM5LjA1MDQ0MDIsMTcuMDE2IEM0Mi42MDI0NDAyLDE3LjAxNiA0Ni4yNTA0NDAyLDE4LjE2OCA0OC41NTQ0NDAyLDIwLjUyIEM1MC4xMzg0NDAyLDIyLjE1MiA1MS4wNTA0NDAyLDI0LjUwNCA1MS4wNTA0NDAyLDI2Ljk1MiBDNTEuMDUwNDQwMiwzMC43NDQgNDguNjUwNDQwMiwzMy41MjggNDUuMDUwNDQwMiwzNS4wMTYgTDQ1LjA1MDQ0MDIsMzUuMTYgQzQ5Ljg1MDQ0MDIsMzUuOTI4IDUyLjY4MjQ0MDIsMzkuNDggNTIuNjgyNDQwMiw0My45OTIgWiBNNDEuNjQyNDQwMiwyOC40ODggQzQxLjY0MjQ0MDIsMjYuMTg0IDM5Ljk2MjQ0MDIsMjUuMTI4IDM3LjMyMjQ0MDIsMjUuMTI4IEwzMS45NDY0NDAyLDI1LjEyOCBMMzEuOTQ2NDQwMiwzMS44OTYgTDM3LjQxODQ0MDIsMzEuODk2IEM0MC4xNTQ0NDAyLDMxLjg5NiA0MS42NDI0NDAyLDMwLjYgNDEuNjQyNDQwMiwyOC40ODggWiBNNDMuMjI2NDQwMiw0Mi44ODggQzQzLjIyNjQ0MDIsNDAuNDg4IDQxLjIxMDQ0MDIsMzkuMzg0IDM4LjkwNjQ0MDIsMzkuMzg0IEwzMS45NDY0NDAyLDM5LjM4NCBMMzEuOTQ2NDQwMiw0Ni40NCBMMzguOTU0NDQwMiw0Ni40NCBDNDEuMzU0NDQwMiw0Ni40NCA0My4yMjY0NDAyLDQ1LjI4OCA0My4yMjY0NDAyLDQyLjg4OCBaIiBpZD0iQi1Db3B5IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==",
}

export default Data
