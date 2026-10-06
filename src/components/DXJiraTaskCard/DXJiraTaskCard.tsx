import 'bootstrap/dist/css/bootstrap.min.css';
import "./DXJiraTaskCard.scss";
import React, { useEffect, useState } from "react";
import { IconButtonProps, ImageProps, LinksProps, StateIcons, TagProps, getIcon, getLinkTarget, renderAvatarProjectMembers } from "../../utilities";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Dropdown } from 'react-bootstrap';
import DXToggleMenu from "../DXToggleMenu";
import { ToggleMenuProps } from "../DXToggleMenu/DXToggleMenu";
import DXButton from "../DXButton";
import DXEmptyState, { EmptyStateProps } from "../DXEmptyState/DXEmptyState";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";
interface JiraTaskItem {
    title: LinksProps;
    id?: string,
    text?: string,
    status?: TagProps;
}
export interface JiraTaskCardProps extends CardComponent {
    tasks?: JiraTaskItem[];
    projectInfo: ProjectCardProps;
    empty?: EmptyStateProps;
    icons?: StateIcons;
    dropdownOpen?: boolean;
}
export interface ProjectCardProps {
    name: string,
    img?: ImageProps,
    symbol?: string,
    tags: string[],
    manager?: {
        img?: string,
        name: string,
        profileLink: string;
    },
    members: {
        name: string,
        img?: string;
    }[];
    action?: IconButtonProps;
}
const DXJiraTaskCard = ( props: JiraTaskCardProps ) => {
    const [showTasks, setShowTasks] = useState( props.dropdownOpen || false );
    const [activeFilters, setActiveFilters] = useState<any>( [] );
    const [tasksFiltered, setTasksFiltered] = useState( [] as JiraTaskItem[] );
    const [activeTooltip, setActiveTooltip] = useState( -1 );
    const [newOptions, setNewOptions] = useState<any>( [] );
    const [disabledMenu, setDisabledMenu] = useState( false );
    const [expand, setExpand] = useState( props.dropdownOpen || false );
    useEffect( () => {
        if ( props.dropdownOpen !== undefined ) {
            setExpand( props.dropdownOpen );
        }
    }, [props.dropdownOpen] );
    useEffect( () => {
        if ( props.tasks && props.tasks.length > 0 ) {
            let tasksStatus = props.tasks.map( ( task: any ) => ( capitalize( task.status.label ) ) );
            setNewOptions( Array.from( new Set( tasksStatus ) ) );
        }
    }, [props.tasks] );
    useEffect( () => {
        if ( activeFilters.length > 0 ) {
            let finalOptions = [];
            finalOptions = newOptions.filter( ( item: any ) => {
                if ( !activeFilters.includes( item ) ) {
                    return item;
                }
            } );
            setNewOptions( finalOptions );
        }
    }, [activeFilters] );
    useEffect( () => {
        newOptions.length === 0 ? setDisabledMenu( true ) : setDisabledMenu( false );
    }, [newOptions] );
    const typeFilter = () => {
        if ( props.tasks && props.tasks.length <= 4 ) {
            let toggleProps = {} as ToggleMenuProps;
            let tasksStatus = props.tasks.map( ( task ) => ( task.status?.label ) );
            toggleProps.type = 'multi';
            toggleProps.buttons = [...tasksStatus.filter( ( item: any, index: number ) => ( tasksStatus.indexOf( item ) === index ) ).map( ( element: any ) => (
                {
                    label: capitalize( element ),
                    handleClick: selectedOptionToggleMenu
                }
            ) )];
            return (
                <>
                    <div className="dxJiraTaskCard__listHeader">
                        <p className="dxJiraTaskCard__listHeaderTitle">My Tickets</p>
                        <DXToggleMenu {...toggleProps} />
                    </div>
                </>
            );
        } else {
            return (
                <div className="dxJiraTaskCard__listHeader">
                    <p className="dxJiraTaskCard__listHeaderTitle">My Tickets</p>
                    <div className="dxJiraTaskCard__filter" data-testid="dxJiraTaskCard__filter">
                        {activeFilters.length > 0 &&
                            <div className="dxJiraTaskCard__tags" data-testid="filter-tags">
                                {activeFilters.length > 0 &&
                                    activeFilters.map( ( filter: string, index: number ) => (
                                        <span key={index} id={"tag-" + ( filter.replace( / /g, "" ) )} data-testid={"tag-" + filter}>
                                            {filter}
                                            <i className="ci-Close_MD"
                                                onClick={() => selectFilterRemove( filter )}
                                            ></i>
                                        </span>
                                    ) )
                                }
                            </div>
                        }
                        <div className="dxJiraTaskCard__button" >
                            <Dropdown show={props.dropdownOpen !== undefined ? props.dropdownOpen : expand} onToggle={() => setExpand( !expand )}>
                                <Dropdown.Toggle as="div" style={{ display: 'inline-block' }}>
                                    <DXButton
                                        displayType="unstyled"
                                        label="Filter by"
                                        data-testid="filter-button"
                                        icon={{
                                            position: 'right',
                                            class: "ci-Unfold_More",
                                        }}
                                        onClick={() => setExpand( !expand )}
                                        disabled={disabledMenu}
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    show={props.dropdownOpen !== undefined ? props.dropdownOpen : expand}
                                    style={( props.dropdownOpen || expand ) ? { display: 'block', opacity: 1, visibility: 'visible' } : undefined}
                                >
                                    {newOptions.map( ( value: string, index: number ) => (
                                        <Dropdown.Item
                                            key={index}
                                            role="menuitem"
                                            tabIndex={0}
                                            onClick={() => {
                                                selectFilterAdd( value );
                                                setExpand( false );
                                            }}
                                        >
                                            {value}
                                        </Dropdown.Item>
                                    ) )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div >
            );
        }
    };
    const capitalize = ( str: string ) => {
        return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
    };
    const selectFilterAdd = ( event: any ) => {
        let newFilter = event;
        let newFilters = [...activeFilters];
        newFilters.push( newFilter );
        setActiveFilters( [...newFilters] );
        newFilters.forEach( ( filter: any ) => {
            setTasksFiltered( tasksFiltered.concat( mainFilter( filter ) as JiraTaskItem[] ) );
        } );
    };
    const selectFilterRemove = ( value: string ) => {
        let oldFilter = value;
        let newFilters = activeFilters.filter( ( item: string ) => item !== oldFilter );
        setActiveFilters( [...newFilters] );
        setTasksFiltered(
            tasksFiltered.filter( ( item ) => {
                if ( item?.status?.label.toLowerCase() !== value.toLowerCase() ) {
                    return item;
                }
            } ) as JiraTaskItem[] );
        newOptions.push( oldFilter );
        setNewOptions( newOptions );
    };
    const mainFilter = ( status: any ) => {
        return props.tasks && props.tasks.filter( ( item ) => {
            if ( item?.status?.label.toLowerCase() === status.toLowerCase() ) {
                return item;
            }
        } );
    };
    const selectedOptionToggleMenu = ( status: any, detail: any ) => {
        if ( detail[2] === "btn-secondary" ) {
            setTasksFiltered( tasksFiltered.concat( mainFilter( status ) as JiraTaskItem[] ) );
        } else {
            setTasksFiltered(
                tasksFiltered.filter( ( item ) => {
                    if ( item?.status?.label.toLowerCase() !== status.toLowerCase() ) {
                        return item;
                    }
                } ) as JiraTaskItem[] );
        }
    };
    //Jira Task item
    const jiraTaskItem = ( task: JiraTaskItem ) => {
        return (
            <li key={task.id + "-li"}>
                <Row className="dxJiraTaskCard__task" key={task.id} data-testid="task-item">
                    <Col className="dxJiraTaskCard__taskInfoWrap"
                        xs={8} md={8} lg={8} xl={8} key={1}>
                        <div className="dxJiraTaskCard__taskInfoMain">
                            <p data-testid="task-id"> {task.id}</p>
                            <a href={task.title.url}
                                target={getLinkTarget( task.title.target )}
                                data-testid="task-title">{task.title.label}
                            </a>
                        </div>
                        <p className="dxJiraTaskCard__taskInfoText" data-testid="task-text"> {task.text}</p>
                    </Col>
                    <Col className="dxJiraTaskCard__taskTagWrap"
                        xs={4} md={4} lg={4} xl={4} key={4}>
                        <Badge bg="" data-testid="task-tag" className="dxJiraTaskCard__taskTag"
                            style={task?.status?.color ? { color: task.status.color, borderColor: task.status.color } : {}}>
                            {task?.status?.label}
                        </Badge>
                    </Col>
                </Row>
            </li >
        );
    };
    //Jira Tasks List
    const jiraTaskList = () => {
        let propsEmpty = props.empty ? props.empty : {
            title: "No tasks here",
            text: "Contact your manager for additional assignments"
        } as EmptyStateProps;
        if ( props.tasks && props.tasks.length > 0 ) {
            return (
                <div className="dxJiraTaskCard__list" data-testid="list-container">
                    {typeFilter()}
                    <ul className="dxJiraTaskCard__listTasks" data-testid="list-tasks">
                        {tasksFiltered && tasksFiltered.length > 0 ?
                            tasksFiltered.map( ( item ) => ( jiraTaskItem( item ) ) )
                            : props.tasks && props.tasks.map( ( item ) => ( jiraTaskItem( item ) ) )}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="dxJiraTaskCard__list" data-testid="list-container">
                    <div className="dxJiraTaskCard__listHeader">
                        <p className="dxJiraTaskCard__listHeaderEmpty">My Tickets</p>
                    </div>
                    <DXEmptyState {...propsEmpty}></DXEmptyState>
                </div>
            );
        }
    };
    //Methods To Project Card
    const renderTags = ( tags: string[] ) => {
        return tags.map( ( tag: string, index: number ) => (
            <Badge className='dxJiraTaskCard__projectTag' bg='' key={index}>
                {tag}
            </Badge>
        ) );
    };
    const renderMembers = ( members: { name: string, img?: string; }[] ) => {
        return (
            <div className='dxJiraTaskCard__projectMembers' key={"members"}>
                {members.slice( 0, 5 ).map( ( member: { name: string, img?: string; }, index: number ) => (
                    <div className="dxJiraTaskCard__projectMemberContainer" key={index}>
                        {member.img ? (
                            <img className="dxJiraTaskCard__projectProfileImage" src={member.img} alt={member.name} key={index}
                                onMouseEnter={() => setActiveTooltip( index )}
                                onMouseLeave={() => setActiveTooltip( -1 )} />
                        ) : renderAvatarProjectMembers( member.name, 'dxJiraTaskCard__projectMember', `${index}`, "", () => setActiveTooltip( index ), () => setActiveTooltip( -1 ) )
                        }
                        {activeTooltip === index &&
                            <span className={`dxJiraTaskCard__projectTooltip`}>{member.name}</span>
                        }
                    </div>
                ) )}
                {members.length > 5 &&
                    <span className="dxJiraTaskCard__projectBadge" data-testid="more-badge">
                        +{members.length - 5}
                    </span>
                }
            </div>
        );
    };
    const projectCard = () => {
        return (
            <div className="dxJiraTaskCard__project" data-testid="dxJiraTaskCard-project">
                <div className='dxJiraTaskCard__projectData'>
                    {props.projectInfo.img ? (
                        <div className='dxJiraTaskCard__projectImage'>
                            <img src={props.projectInfo.img.url} alt={props.projectInfo.img.altText} />
                        </div>
                    ) : (
                        <div className="dxJiraTaskCard__projectSymbol">
                            {props.projectInfo.symbol ? props.projectInfo.symbol.slice( 0, 3 ) : props.projectInfo.name.slice( 0, 3 )}
                        </div>
                    )}
                    <div className='dxJiraTaskCard__projectNameTag'>
                        <p>{props.projectInfo.name}</p>
                        <div className='dxJiraTaskCard__projectTags'>
                            {renderTags( props.projectInfo.tags )}
                        </div>
                    </div>
                </div>
                <div className='dxJiraTaskCard__projectExtraData'>
                    <div className='dxJiraTaskCard__projectMemberSection'>
                        <p>Team</p>
                        {renderMembers( props.projectInfo.members )}
                    </div>
                    <div className='dxJiraTaskCard__projectButtonSection'>
                        <DXButton
                            onClick={() => setShowTasks( !showTasks )}
                            displayType='unstyled'
                            label='show information'
                            className='dxJiraTaskCard__projectTrigger'
                            data-testid="button-trigger"
                            hideLabel
                            icon={{
                                class: showTasks ? getIcon( props.icons, "open", "ci-Chevron_Up" ) : getIcon( props.icons, "close", "ci-Chevron_Down" )
                            }}
                        />
                    </div>
                </div>
            </div >
        );
    };
    return (
        <div className="dxJiraTaskCard" data-testid="dxJiraTaskCard">
            {projectCard()}
            {showTasks && jiraTaskList()}
        </div>
    );
};
export default DXJiraTaskCard;
