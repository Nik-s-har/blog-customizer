import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	setState: Dispatch<SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [fontFamilyOption, setFontFamilyOption] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeOption, setFontSizeOption] = useState(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const buttonClick = () => {
		setIsOpen(!isOpen);
	};

	const onClose = () => {
		setIsOpen(false);
	};

	const clickApplyButton = (e: React.FormEvent) => {
		e.preventDefault();
		const formState: ArticleStateType = {
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		};
		props.setState(formState);
	};

	const clickResetButton = () => {
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		props.setState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={buttonClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={clickApplyButton}>
					<Text
						as='h2'
						size={31}
						weight={800}
						uppercase
						fontStyle='Open Sans'
						align='left'>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamilyOption}
						onChange={setFontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						name='radio'
						selected={fontSizeOption}
						onChange={setFontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={clickResetButton}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
