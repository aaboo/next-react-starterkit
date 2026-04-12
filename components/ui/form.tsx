"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"

const Form = FormProvider

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    control: any
    name: string
    render: (props: {
      field: any
      fieldState: any
      formState: any
    }) => React.ReactNode
  }
>(({ control, name, render, ...props }, ref) => (
  <FormFieldContext.Provider value={{ name }}>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const node = render({ field, fieldState, formState })
        return node as React.ReactElement
      }}
    />
  </FormFieldContext.Provider>
))

FormField.displayName = "FormField"

interface FormItemContextValue {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})

FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { id } = React.useContext(FormItemContext)

  return (
    <LabelPrimitive.Root
      ref={ref}
      htmlFor={id}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
})

FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { id } = React.useContext(FormItemContext)

  return (
    <Slot
      ref={ref}
      id={id}
      aria-describedby={`${id}-form-item-description ${id}-form-item-message`}
      {...props}
    />
  )
})

FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { id } = React.useContext(FormItemContext)

  return (
    <p
      ref={ref}
      id={`${id}-form-item-description`}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})

FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { id } = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()
  const fieldContext = React.useContext(FormFieldContext)

  if (!fieldContext) {
    return null
  }

  const fieldState = getFieldState(fieldContext.name as any, formState)

  if (!fieldState?.error) {
    return null
  }

  return (
    <p
      ref={ref}
      id={`${id}-form-item-message`}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {fieldState.error.message}
    </p>
  )
})

FormMessage.displayName = "FormMessage"

export {
  useFormContext as useForm,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}
