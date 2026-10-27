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
// Centralized constants (easy to test / override)
export const SUMMARY_LENGTH = 250;
export const HARD_MAX_ITEMS = 9;
export const DEFAULT_TEXT_COLOR_LIGHT = '#ffffff';
export const DEFAULT_TEXT_COLOR_DARK = '#272833';
// Height constants
export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_HEIGHT_MOBILE = '400px';
export const FALLBACK_IMAGE_BASE64 =
    "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDE5MjAgNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjREREREREIi8+PHBhdGggZmlsbD0iIzk5OTk5OSIgZD0iTTQ2NS45NTUgMzYwLjUyNWgyOS4yNXYyMC44MWgtOTB2LTIwLjgxaDMyLjk3di05NC44NHEwLTUuNjMuMzMtMTEuNTlsLTIzLjQgMTkuNThxLTIuMDIgMS41Ny0zLjk5IDEuOTctMS45Ny4zOS0zLjcxLjA1LTEuNzUtLjM0LTMuMS0xLjE4dC0yLjAyLTEuODVsLTguNzgtMTIuMDQgNDkuNjItNDIuMTloMjIuODN6bTgwLjQ0LTkzLjA0cTAgMTMuNjEgNy4wMyAyMC43NiA3LjAzIDcuMTQgMTkuOTcgNy4xNCA2Ljc1IDAgMTIuMDQtMi4xNHQ4Ljg5LTUuODUgNS40NS04Ljc3cTEuODYtNS4wNyAxLjg2LTEwLjkyIDAtNi42My0yLjAzLTExLjg2LTIuMDItNS4yMy01LjczLTguODQtMy43Mi0zLjYtOC44NC01LjUxLTUuMTEtMS45MS0xMS4xOS0xLjkxLTYuMyAwLTExLjM2IDIuMDh0LTguNjYgNS43OXEtMy42IDMuNzItNS41MiA4Ljg0LTEuOTEgNS4xMi0xLjkxIDExLjE5bS0xMy42MSAxMTMuODUgNTAuNTEtNjMuMTFxMS45MS0yLjM3IDMuNi00LjYydDMuMjYtNC41cS01LjYyIDMuNi0xMi4zNyA1LjQ2dC0xNC4xOCAxLjg2cS04LjQzIDAtMTYuNTMtMi45My04LjEtMi45Mi0xNC40LTguODN0LTEwLjE5LTE0LjYycS0zLjg4LTguNzItMy44OC0yMC40MiAwLTEwLjkyIDQuMDUtMjAuNDh0MTEuMzctMTYuNzZxNy4zMS03LjIgMTcuNTUtMTEuMzYgMTAuMjMtNC4xNiAyMi42MS00LjE2IDEyLjQ5IDAgMjIuNDQgMy45MyA5Ljk2IDMuOTQgMTYuOTkgMTEuMDMgNy4wMyA3LjA4IDEwLjggMTYuOTh0My43NyAyMS43MnEwIDcuNTMtMS4zIDE0LjI4LTEuMjkgNi43NS0zLjY1IDEzLTIuMzYgNi4yNC01Ljc0IDEyLjItMy4zNyA1Ljk3LTcuNTQgMTEuODJsLTM3LjIzIDUzLjFxLTEuOTIgMi43LTUuNzQgNC41NS0zLjgzIDEuODYtOC42NiAxLjg2em0xNzUuNjEtMjUuODhoNDEuNzRxNC41IDAgNy4xNCAyLjU0IDIuNjUgMi41MyAyLjY1IDYuNjl2MTYuNjVoLTExMS42di05LjIycTAtMi44MiAxLjE4LTUuOTEgMS4xOC0zLjEgMy43Ny01LjU3bDQ5LjM4LTQ5LjVxNi4xOS02LjMgMTEuMDgtMTIuMDQgNC45LTUuNzQgOC4xNi0xMS4zNiAzLjI2LTUuNjMgNS4wMS0xMS40MiAxLjc0LTUuNzkgMS43NC0xMi4yMSAwLTUuODUtMS42OS0xMC4yOS0xLjY4LTQuNDQtNC43OC03LjQ4LTMuMDktMy4wNC03LjQyLTQuNTZ0LTkuNzMtMS41MnEtNC45NSAwLTkuMTcgMS40MXQtNy40OCAzLjk0cS0zLjI3IDIuNTMtNS41MiA1LjktMi4yNSAzLjM4LTMuMzcgNy40My0xLjkxIDUuMTctNC45NSA2Ljg2dC04Ljc4Ljc5bC0xNC42Mi0yLjU5cTEuNjktMTEuNyA2LjUyLTIwLjUzIDQuODQtOC44MyAxMi4xLTE0Ljc0IDcuMjUtNS45IDE2LjY1LTguODggOS4zOS0yLjk4IDIwLjE5LTIuOTggMTEuMjUgMCAyMC41OSAzLjMxIDkuMzQgMy4zMiAxNS45NyA5LjQgNi42NCA2LjA3IDEwLjM1IDE0LjYyIDMuNzIgOC41NSAzLjcyIDE5LjAxIDAgOS0yLjY1IDE2LjY1LTIuNjQgNy42NS03LjA5IDE0LjYzLTQuNDQgNi45Ny0xMC40IDEzLjUtNS45NiA2LjUyLTEyLjQ5IDEzLjI3bC0zNi42NyAzNy40N3E1LjI4LTEuNTggMTAuNTEtMi40MiA1LjI0LS44NSA5Ljk2LS44NSIvPjwvc3ZnPg==";
