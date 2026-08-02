/**
 * ------------------------------------------------------------------
 * File: services/heatmap.service.ts
 * ------------------------------------------------------------------
 */

import {

    ICoordinate,
    IHeatmapPoint,
    IHeatmapRequest

} from "../maps.interface";

class HeatmapService {

    /**
     * ----------------------------------------------------------
     * Generate Heatmap
     * ----------------------------------------------------------
     */
    generate(

        request: IHeatmapRequest

    ): IHeatmapPoint[] {

        return request.points;

    }










    /**
     * ----------------------------------------------------------
     * Normalize Weights
     * ----------------------------------------------------------
     */
    normalize(

        points: IHeatmapPoint[]

    ): IHeatmapPoint[] {

        if (

            points.length === 0

        ) {

            return [];

        }

        const maxWeight =

            Math.max(

                ...points.map(

                    p => p.weight

                )

            );

        return points.map(

            point => ({

                ...point,

                weight:

                point.weight /

                maxWeight

            })

        );

    }










    /**
     * ----------------------------------------------------------
     * Aggregate Duplicate Coordinates
     * ----------------------------------------------------------
     */
    aggregate(

        points: IHeatmapPoint[]

    ): IHeatmapPoint[] {

        const map =

            new Map<

                string,

                IHeatmapPoint

            >();

        for (

            const point

            of points

        ) {

            const key =

                `${point.coordinate.latitude},${point.coordinate.longitude}`;

            const existing =

                map.get(key);

            if (

                existing

            ) {

                existing.weight +=

                    point.weight;

            }

            else {

                map.set(

                    key,

                    {

                        ...point

                    }

                );

            }

        }

        return [

            ...map.values()

        ];

    }

}
/**
 * ------------------------------------------------------------------
 * File: services/heatmap.service.ts
 * ------------------------------------------------------------------
 */

import {

    ICoordinate,
    IHeatmapPoint,
    IHeatmapRequest

} from "../maps.interface";

class HeatmapService {

    /**
     * ----------------------------------------------------------
     * Generate Heatmap
     * ----------------------------------------------------------
     */
    generate(

        request: IHeatmapRequest

    ): IHeatmapPoint[] {

        return request.points;

    }










    /**
     * ----------------------------------------------------------
     * Normalize Weights
     * ----------------------------------------------------------
     */
    normalize(

        points: IHeatmapPoint[]

    ): IHeatmapPoint[] {

        if (

            points.length === 0

        ) {

            return [];

        }

        const maxWeight =

            Math.max(

                ...points.map(

                    p => p.weight

                )

            );

        return points.map(

            point => ({

                ...point,

                weight:

                point.weight /

                maxWeight

            })

        );

    }










    /**
     * ----------------------------------------------------------
     * Aggregate Duplicate Coordinates
     * ----------------------------------------------------------
     */
    aggregate(

        points: IHeatmapPoint[]

    ): IHeatmapPoint[] {

        const map =

            new Map<

                string,

                IHeatmapPoint

            >();

        for (

            const point

            of points

        ) {

            const key =

                `${point.coordinate.latitude},${point.coordinate.longitude}`;

            const existing =

                map.get(key);

            if (

                existing

            ) {

                existing.weight +=

                    point.weight;

            }

            else {

                map.set(

                    key,

                    {

                        ...point

                    }

                );

            }

        }

        return [

            ...map.values()

        ];

    }

}