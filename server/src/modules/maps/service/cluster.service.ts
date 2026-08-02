/**
 * ------------------------------------------------------------------
 * File: services/cluster.service.ts
 * ------------------------------------------------------------------
 */

import {

    ICoordinate,
    ICluster,
    IMarker

} from "../maps.interface";

import distanceService
from "./distance.service";

class ClusterService {

    /**
     * ----------------------------------------------------------
     * Distance-based Clustering
     * ----------------------------------------------------------
     */
    cluster(

        markers: IMarker[],

        radiusMeters = 500

    ): ICluster[] {

        const visited =

            new Set<string>();

        const clusters:

        ICluster[] = [];

        for (

            const marker

            of markers

        ) {

            if (

                visited.has(

                    marker.id

                )

            ) {

                continue;

            }

            visited.add(

                marker.id

            );

            const members =

                [marker];

            for (

                const candidate

                of markers

            ) {

                if (

                    visited.has(

                        candidate.id

                    )

                ) {

                    continue;

                }

                const distance =

                    distanceService.haversine(

                        marker.coordinate,

                        candidate.coordinate

                    );

                if (

                    distance <=

                    radiusMeters

                ) {

                    visited.add(

                        candidate.id

                    );

                    members.push(

                        candidate

                    );

                }

            }

            clusters.push({

                center:

                this.centroid(

                    members

                ),

                markers:

                members,

                count:

                members.length

            });

        }

        return clusters;

    }










    /**
     * ----------------------------------------------------------
     * Cluster Centroid
     * ----------------------------------------------------------
     */
    centroid(

        markers: IMarker[]

    ): ICoordinate {

        const latitude =

            markers.reduce(

                (

                    total,

                    marker

                ) =>

                    total +

                    marker.coordinate.latitude,

                0

            ) /

            markers.length;

        const longitude =

            markers.reduce(

                (

                    total,

                    marker

                ) =>

                    total +

                    marker.coordinate.longitude,

                0

            ) /

            markers.length;

        return {

            latitude,

            longitude

        };

    }

}
/**
 * ----------------------------------------------------------
 * Zoom-based Clustering
 * ----------------------------------------------------------
 */
clusterByZoom(

    markers: IMarker[],

    zoom: number

): ICluster[] {

    let radius = 500;

    if (zoom <= 5) {

        radius = 10000;

    }

    else if (zoom <= 8) {

        radius = 5000;

    }

    else if (zoom <= 12) {

        radius = 1000;

    }

    else if (zoom <= 15) {

        radius = 500;

    }

    else {

        radius = 100;

    }

    return this.cluster(

        markers,

        radius

    );

}