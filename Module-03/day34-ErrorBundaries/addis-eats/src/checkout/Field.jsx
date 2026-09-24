function Field({
     id,
     label,
     error,
     children,
}) {
     const showError = Boolean(error);

     return (
          <div className="checkout-field">
               <label htmlFor={id}>{label}</label>
               {children}
               {showError && (
                    <p id={`${id}-error`} className="field-error" role="alert">
                         {error}
                    </p>
               )}
          </div>
     );
}

export default Field;