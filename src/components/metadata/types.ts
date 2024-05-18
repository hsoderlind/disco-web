import { ReactNode } from "react";
import { EmptyFn } from "../../types/common";
import { Metadata } from "../../services/metadata/Metadata";

export type RenderButtonBarParams = {
	openModal: EmptyFn;
	closeModal: EmptyFn;
}

export type AfterActionCallbackFn = (metadata: Metadata) => void;

export type CommonProps = {
	resource: string;
	resourceId: number;
}

export type MetadataProps = {
	renderButtonBar?: (params: RenderButtonBarParams) => ReactNode;
} & CommonProps;

export type MetadataCreateProps = {
	open: boolean;
	onCancel?: EmptyFn;
	onCreated?: AfterActionCallbackFn;
} & CommonProps;

export type MetadataEditProps = {
	metadata: Metadata;
	open: boolean;
	onCancel?: EmptyFn;
	onUpdated?: AfterActionCallbackFn;
} & CommonProps;
