export const contract = {
  "apod": {
    "get": {
      "method": "get",
      "description": "Get NASA Astronomy Picture of the Day",
      "noAuth": true,
      "encrypted": false,
      "isDownloadable": false,
      "media": null,
      "input": {},
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "date": {
              "type": "string"
            },
            "explanation": {
              "type": "string"
            },
            "hdurl": {
              "type": "string"
            },
            "url": {
              "type": "string"
            },
            "media_type": {
              "type": "string",
              "enum": [
                "image",
                "video"
              ]
            }
          },
          "required": [
            "title",
            "date",
            "explanation",
            "hdurl",
            "url",
            "media_type"
          ],
          "additionalProperties": false
        }
      }
    }
  },
  "epic": {
    "get": {
      "method": "get",
      "description": "Get latest EPIC natural color Earth images",
      "noAuth": true,
      "encrypted": false,
      "isDownloadable": false,
      "media": null,
      "input": {},
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "identifier": {
                "type": "string"
              },
              "caption": {
                "type": "string"
              },
              "image": {
                "type": "string"
              },
              "date": {
                "type": "string"
              },
              "centroid_coordinates": {
                "type": "object",
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lon": {
                    "type": "number"
                  }
                },
                "required": [
                  "lat",
                  "lon"
                ],
                "additionalProperties": false
              },
              "url": {
                "type": "string"
              }
            },
            "required": [
              "identifier",
              "caption",
              "image",
              "date",
              "centroid_coordinates",
              "url"
            ],
            "additionalProperties": false
          }
        }
      }
    }
  },
  "iss": {
    "get": {
      "method": "get",
      "description": "Get ISS current status and orbit path from NASA TLE",
      "noAuth": true,
      "encrypted": false,
      "isDownloadable": false,
      "media": null,
      "input": {},
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "status": {
              "type": "object",
              "properties": {
                "latitude": {
                  "type": "number"
                },
                "longitude": {
                  "type": "number"
                },
                "altitude": {
                  "type": "number"
                },
                "velocity": {
                  "type": "number"
                },
                "timestamp": {
                  "type": "number"
                }
              },
              "required": [
                "latitude",
                "longitude",
                "altitude",
                "velocity",
                "timestamp"
              ],
              "additionalProperties": false
            },
            "positions": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                },
                "required": [
                  "lat",
                  "lng"
                ],
                "additionalProperties": false
              }
            },
            "terminator": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                },
                "required": [
                  "lat",
                  "lng"
                ],
                "additionalProperties": false
              }
            }
          },
          "required": [
            "status",
            "positions",
            "terminator"
          ],
          "additionalProperties": false
        }
      }
    }
  }
} as const

export default contract
