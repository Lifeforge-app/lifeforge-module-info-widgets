export const contract = {
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
