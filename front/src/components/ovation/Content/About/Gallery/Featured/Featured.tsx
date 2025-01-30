import { profileInfo } from "@/lib/utils/constants";
import Image from "next/image";

const Featured = () => {
    const { content } = profileInfo;

    return (
        <div className="profile-featured-section">
            <div className="profile-featured-header">
                <h2 className="profile-featured-header-text">
                    {content.featuredHeader}
                </h2>
            </div>
            <div className="profile-featured-container">
                <div className="featured-container">
                    <div className="project-container-wrap">
                        <div className="featured-header">
                            <h5 className="featured-title">
                                {content.projectHeader}
                            </h5>
                        </div>
                        <div className="featured-detail-wrap">
                            <div className="project">
                                <div className="project-details">
                                    <div className="featured-name-wrap">
                                        <h3 className="featured-name">
                                            {content.featuredProject.title}
                                        </h3>
                                    </div>
                                    <div className="description-wrap">
                                        <p className="featured-description">
                                            {
                                                content.featuredProject
                                                    .description
                                            }
                                            <span className="expand-text">
                                                {content.textExpansion}
                                                <b className="text-expand">
                                                    {content.textDelimeter}
                                                </b>
                                                {content.textExpansion}
                                                {content.moreText}
                                            </span>
                                            {
                                                content.featuredProject
                                                    .remainingDescription
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="project-grid-wrap">
                                    <div className="project-grid">
                                        {content.featuredProject.items.map(
                                            (project) => (
                                                <div
                                                    key={project.name}
                                                    className="project-container"
                                                >
                                                    <Image
                                                        src={project.imageUrl}
                                                        alt={project.collection}
                                                        height={70}
                                                        width={103}
                                                        className="project-item"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="featured-rep-container">
                            <div className="project-rep-wrap">
                                <div className="featured-rep-details">
                                    <span className="featured-rep-wrap">
                                        <h6 className="featured-rep-count">
                                            {content.featuredProject.viewCount}
                                        </h6>
                                        <h6 className="featured-rep-identifier">
                                            {content.viewsText}
                                        </h6>
                                    </span>
                                    <span className="featured-rep-wrap">
                                        <h6 className="featured-rep-count">
                                            {
                                                content.featuredProject
                                                    .collectedCount
                                            }
                                        </h6>
                                        <h6 className="featured-rep-identifier">
                                            {
                                                content.featuredProject
                                                    .collectedText
                                            }
                                        </h6>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="featured-container">
                    <div className="post-container">
                        <div className="featured-header">
                            <h5 className="featured-title">
                                {content.postsHeader}
                            </h5>
                        </div>
                        <div className="post">
                            <div className="featured-detail-wrap">
                                <div className="post-details">
                                    <div className="featured-name-wrap">
                                        <h3 className="featured-name">
                                            {content.featuredPost.title}
                                        </h3>
                                    </div>
                                    <div className="content-container">
                                        <div className="post-content-wrap">
                                            <span className="post-description-wrap">
                                                <p className="featured-description">
                                                    {
                                                        content.featuredPost
                                                            .content
                                                    }
                                                    <span className="expand-text">
                                                        {content.textExpansion}
                                                        <b className="text-expand">
                                                            {
                                                                content.textDelimeter
                                                            }
                                                        </b>
                                                        {content.textExpansion}
                                                        {content.moreText}
                                                        {content.textExpansion}
                                                    </span>
                                                </p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="featured-rep-container">
                            <div className="post-rep-wrap">
                                <div className="post-rep-details">
                                    <span className="featured-rep-wrap">
                                        <h6 className="featured-rep-count">
                                            {content.featuredPost.views}
                                        </h6>
                                        <h6 className="featured-rep-identifier">
                                            {content.viewsText}
                                        </h6>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="featured-container">
                    <div className="event-container">
                        <div className="featured-header">
                            <h5 className="featured-title">
                                {content.eventsHeader}
                            </h5>
                        </div>
                        <div className="event">
                            <div className="featured-detail-wrap">
                                <div className="event-details">
                                    <div className="featured-name-wrap">
                                        <h3 className="featured-name">
                                            {content.featuredEvent.title}
                                        </h3>
                                    </div>
                                    <div className="event-content-wrap">
                                        <div className="event-content">
                                            <Image
                                                className="event-preview"
                                                src={
                                                    content.featuredEvent
                                                        .imageUrl
                                                }
                                                alt={
                                                    content.featuredEvent
                                                        .alternativeText
                                                }
                                                width={
                                                    content.featuredEvent
                                                        .imageWidth
                                                }
                                                height={
                                                    content.featuredEvent
                                                        .imageHeight
                                                }
                                            />
                                            <div className="event-properties">
                                                <div className="event-calendar">
                                                    <div className="event-icon">
                                                        {content.featuredEvent.date.icon(
                                                            {}
                                                        )}
                                                    </div>
                                                    <div className="calendar-datetime">
                                                        {
                                                            content
                                                                .featuredEvent
                                                                .date.when
                                                        }
                                                    </div>
                                                </div>
                                                <div className="event-type">
                                                    <div className="event-icon">
                                                        {content.featuredEvent.isVirtual.icon(
                                                            {}
                                                        )}
                                                    </div>
                                                    <div className="event-type-text">
                                                        {
                                                            content
                                                                .featuredEvent
                                                                .isVirtual
                                                                .virtualText
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="featured-rep-container">
                            <div className="event-rep-wrap">
                                <div className="featured-event-details">
                                    <span className="featured-rep-wrap">
                                        <h6 className="featured-rep-count">
                                            {content.featuredEvent.views}
                                        </h6>
                                        <h6 className="featured-rep-identifier">
                                            {content.viewsText}
                                        </h6>
                                    </span>
                                    <span className="event-button-wrap">
                                        <h6 className="event-button">
                                            {
                                                content.featuredEvent
                                                    .calendarNotice
                                            }
                                        </h6>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
