import {
	AlignmentToolbar, BlockControls, InspectorControls, PanelColorSettings,
} from '@wordpress/block-editor'
import { i18n, showProNotice } from 'stackable'
import { PanelBody, RangeControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'
import classnames from 'classnames'
import { Fragment } from '@wordpress/element'
import { ProControl } from '@stackable/components'

const edit = props => {
	const { className } = props
	const {
		height,
		width,
		color,
		alignment,
		design = '',
	} = props.attributes

	const mainClasses = classnames( [
		className,
		'ugb-divider',
	], applyFilters( 'stackable.divider.mainclasses', {}, design, props ) )

	return (
		<Fragment>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ function( alignment ) {
						props.setAttributes( { alignment: alignment } )
					} }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'General Settings', i18n ) }
					colorSettings={ [
						{
							value: color,
							onChange: colorValue => props.setAttributes( { color: colorValue } ),
							label: __( 'Divider Color', i18n ),
						},
					] }
				>
					<RangeControl
						label={ __( 'Height', i18n ) }
						value={ height }
						min="1"
						max="10"
						onChange={ function( height ) {
							props.setAttributes( { height: height } )
						} }
					/>
					<RangeControl
						label={ __( 'Width', i18n ) }
						value={ width }
						min="10"
						max="100"
						step="0.1"
						onChange={ function( width ) {
							props.setAttributes( { width: width } )
						} }
					/>
				</PanelColorSettings>
				{ showProNotice &&
					<PanelBody
						initialOpen={ false }
						title={ __( 'Custom CSS', i18n ) }
					>
						<ProControl
							title={ __( 'Say Hello to Custom CSS 👋', i18n ) }
							description={ __( 'Further tweak this block by adding guided custom CSS rules. This feature is only available on Stackable Premium', i18n ) }
						/>
					</PanelBody>
				}
				{ applyFilters( 'stackable.divider.edit.inspector.after', null, design, props ) }
			</InspectorControls>
			<div className={ mainClasses } style={ { paddingTop: 8, paddingBottom: 8 } }>
				{ applyFilters( 'stackable.divider.edit.output.before', null, design, props ) }
				<hr align={ alignment } style={ {
					marginTop: 0,
					marginBottom: 0,
					backgroundColor: color,
					width: width + '%',
					height: height,
				} } />
				{ applyFilters( 'stackable.divider.edit.output.after', null, design, props ) }
			</div>
		</Fragment>
	)
}

export default edit
