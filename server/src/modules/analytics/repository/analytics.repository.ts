/**
 * ------------------------------------------------------------------
 * File: analytics.repository.ts
 * ------------------------------------------------------------------
 */

import {

    Analytics,

    IAnalyticsDocument

} from "./analytics.model";

import {

    IAnalytics

} from "./analytics.interface";

import {

    AnalyticsRange,

    ExportStatus

} from "./analytics.types";

class AnalyticsRepository {

    /**
     * ----------------------------------------------------------
     * Create Analytics Snapshot
     * ----------------------------------------------------------
     */
    async create(
        data: Partial<IAnalytics>
    ): Promise<IAnalyticsDocument> {

        return Analytics.create(data);

    }










    /**
     * ----------------------------------------------------------
     * Latest Dashboard
     * ----------------------------------------------------------
     */
    async getLatestDashboard(
        range: AnalyticsRange
    ) {

        return Analytics.findOne({

            range

        })

        .sort({

            generatedAt: -1

        });

    }










    /**
     * ----------------------------------------------------------
     * Dashboard History
     * ----------------------------------------------------------
     */
    async getHistory(
        range: AnalyticsRange,
        limit: number = 30
    ) {

        return Analytics.find({

            range

        })

        .sort({

            generatedAt: -1

        })

        .limit(limit);

    }










    /**
     * ----------------------------------------------------------
     * Find Snapshot By ID
     * ----------------------------------------------------------
     */
    async findById(
        id: string
    ) {

        return Analytics.findById(id);

    }










    /**
     * ----------------------------------------------------------
     * Update Snapshot
     * ----------------------------------------------------------
     */
    async update(
        id: string,
        data: Partial<IAnalytics>
    ) {

        return Analytics.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Delete Snapshot
     * ----------------------------------------------------------
     */
    async delete(
        id: string
    ) {

        return Analytics.findByIdAndDelete(id);

    }










    /**
     * ----------------------------------------------------------
     * Save Export Report
     * ----------------------------------------------------------
     */
    async saveReport(

        analyticsId: string,

        report: any

    ) {

        return Analytics.findByIdAndUpdate(

            analyticsId,

            {

                $push: {

                    reports: report

                }

            },

            {

                new: true

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Update Export Status
     * ----------------------------------------------------------
     */
    async updateExportStatus(

        analyticsId: string,

        reportId: string,

        status: ExportStatus,

        downloadUrl?: string

    ) {

        return Analytics.findOneAndUpdate(

            {

                _id: analyticsId,

                "reports.reportId": reportId

            },

            {

                $set: {

                    "reports.$.status": status,

                    "reports.$.downloadUrl": downloadUrl,

                    "reports.$.generatedAt": new Date()

                }

            },

            {

                new: true

            }

        );

    }

}

export default new AnalyticsRepository();
/**
 * ------------------------------------------------------------------
 * File: analytics.repository.ts
 * ------------------------------------------------------------------
 */

import {

    Analytics,

    IAnalyticsDocument

} from "./analytics.model";

import {

    IAnalytics

} from "./analytics.interface";

import {

    AnalyticsRange,

    ExportStatus

} from "./analytics.types";

class AnalyticsRepository {

    /**
     * ----------------------------------------------------------
     * Create Analytics Snapshot
     * ----------------------------------------------------------
     */
    async create(
        data: Partial<IAnalytics>
    ): Promise<IAnalyticsDocument> {

        return Analytics.create(data);

    }










    /**
     * ----------------------------------------------------------
     * Latest Dashboard
     * ----------------------------------------------------------
     */
    async getLatestDashboard(
        range: AnalyticsRange
    ) {

        return Analytics.findOne({

            range

        })

        .sort({

            generatedAt: -1

        });

    }










    /**
     * ----------------------------------------------------------
     * Dashboard History
     * ----------------------------------------------------------
     */
    async getHistory(
        range: AnalyticsRange,
        limit: number = 30
    ) {

        return Analytics.find({

            range

        })

        .sort({

            generatedAt: -1

        })

        .limit(limit);

    }










    /**
     * ----------------------------------------------------------
     * Find Snapshot By ID
     * ----------------------------------------------------------
     */
    async findById(
        id: string
    ) {

        return Analytics.findById(id);

    }










    /**
     * ----------------------------------------------------------
     * Update Snapshot
     * ----------------------------------------------------------
     */
    async update(
        id: string,
        data: Partial<IAnalytics>
    ) {

        return Analytics.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Delete Snapshot
     * ----------------------------------------------------------
     */
    async delete(
        id: string
    ) {

        return Analytics.findByIdAndDelete(id);

    }










    /**
     * ----------------------------------------------------------
     * Save Export Report
     * ----------------------------------------------------------
     */
    async saveReport(

        analyticsId: string,

        report: any

    ) {

        return Analytics.findByIdAndUpdate(

            analyticsId,

            {

                $push: {

                    reports: report

                }

            },

            {

                new: true

            }

        );

    }










    /**
     * ----------------------------------------------------------
     * Update Export Status
     * ----------------------------------------------------------
     */
    async updateExportStatus(

        analyticsId: string,

        reportId: string,

        status: ExportStatus,

        downloadUrl?: string

    ) {

        return Analytics.findOneAndUpdate(

            {

                _id: analyticsId,

                "reports.reportId": reportId

            },

            {

                $set: {

                    "reports.$.status": status,

                    "reports.$.downloadUrl": downloadUrl,

                    "reports.$.generatedAt": new Date()

                }

            },

            {

                new: true

            }

        );

    }

}

export default new AnalyticsRepository();